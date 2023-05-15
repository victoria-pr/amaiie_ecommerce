import { BrowserRouter, Route, Routes } from "react-router-dom"; //instalamos librería react-router-dom para navegar entre distintos componentes de un proyecto
//Añadimos todas las rutas: Home (están todos los productos), ProductScree (están las fichas individuales de los productos)
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import Navbar from "react-bootstrap/Navbar";
import Badge from "react-bootstrap/Badge";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Store } from "./Store";
import SigninScreen from "./screens/SigninScreen";
import SignupScreen from "./screens/SignupScreen";
import CartScreen from "./screens/CartScreen";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import axios from "axios";
import { getError } from "./utils";
import SearchBox from "./components/SearchBox";
import Button from "react-bootstrap/Button";

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    window.location.href = "/signin";
  };
  //Creamos el sideBar para las categorías
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err)); //Daba error, sustituido por un console.log(error)
        //console.log(err);
      }
    };
    fetchCategories();
  }, []);
  return (
    <BrowserRouter>
      <div
        className={
          sidebarIsOpen //Si está abierto el sideBar aplica active-cont (css en index.css)
            ? "d-flex flex-column site-container active-cont"
            : "d-flex flex-column site-container"
        }
      >
        <ToastContainer position='bottom-center' limit={1} />
        <Navbar bg='dark' variant='dark'>
          <Container>
            <Button
              variant='dark'
              onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
            >
              <i className='fas fa-bars'></i>
            </Button>
            <LinkContainer to='/'>
              <Navbar.Brand>amaiie</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <SearchBox />
              <Nav className='me-auto'>
                <Link to='/cart' className='nav-link'>
                  Cart
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg='danger'>
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Link>
                {userInfo ? (
                  <NavDropdown
                    title={userInfo.username}
                    id='basic-nav-dropdown'
                  >
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>User Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/orderhistory'>
                      <NavDropdown.Item>Order History</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <Link
                      className='dropdown-item'
                      to='/signout'
                      onClick={signoutHandler}
                    >
                      Sign Out
                    </Link>
                  </NavDropdown>
                ) : (
                  <Link className='nav-link' to='/signin'>
                    Sign In
                  </Link>
                )}
                {userInfo && userInfo.isAdmin && (
                  <NavDropdown title='Admin' id='admin-nav-dropdown'>
                    <LinkContainer to='/admin/dashboard'>
                      <NavDropdown.Item>Dashboard</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/admin/products'>
                      <NavDropdown.Item>Products</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/admin/orders'>
                      <NavDropdown.Item>Orders</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/admin/users'>
                      <NavDropdown.Item>Users</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <header className='App-header'>
          {/*  <Link to='/'> amaiie</Link> */}
        </header>
        {/* Sidebar por categorias------------------------------------------ */}
        <div
          className={
            sidebarIsOpen
              ? "active.nav side-navbar d-flex justify-content-betwen flex-wrap flex-column"
              : "side-navbar d-flex justify-content-between flex-wrap flex-colum"
          }
        >
          <Nav className='flex-colum text-white w-100 p-2'>
            <Nav.Item>
              <strong>Categories</strong>
            </Nav.Item>
            {categories.map((category) => (
              <Nav.Item key={category}>
                <LinkContainer
                  to={{ pathname: "/search", search: `category=${category}` }}
                  onClick={() => setSidebarIsOpen(false)}
                >
                  <Nav.Link>{category}</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            ))}
          </Nav>
        </div>
        <main>
          <Container className='mt-3'>
            <Routes>
              <Route path='/product/:slug' element={<ProductScreen />} />
              <Route path='/cart' element={<CartScreen />} />
              <Route path='/signin' element={<SigninScreen />} />
              <Route path='/' element={<HomeScreen />}></Route>
              <Route path='/signup' element={<SignupScreen />} />
              <Route
                path='/shipping'
                element={<ShippingAddressScreen />}
              ></Route>
              <Route path='/placeorder' element={<PlaceOrderScreen />} />
              <Route path='/payment' element={<PaymentMethodScreen />}></Route>
            </Routes>
          </Container>
        </main>
        <footer>
          <div className='text-center'>All right reseved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
