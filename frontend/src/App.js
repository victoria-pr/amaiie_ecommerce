import { BrowserRouter, Route, Routes } from "react-router-dom"; //instalamos librería react-router-dom para navegar entre distintos componentes de un proyecto
//Añadimos todas las rutas: Home (están todos los productos), ProductScree (están las fichas individuales de los productos)
import HomeScreen from "./screens/HomeScreen";
import Axios from "axios";
import ProductScreen from "./screens/ProductScreen";
import Navbar from "react-bootstrap/Navbar";
import Badge from "react-bootstrap/Badge";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { useReducer, useContext, useEffect, useState } from "react";
import { Store } from "./Store";
import SigninScreen from "./screens/SigninScreen";
import SignupScreen from "./screens/SignupScreen";
import CartScreen from "./screens/CartScreen";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHanlder = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
  };

  /*  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
 */
  /*  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await Axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []); */

  return (
    <BrowserRouter>
      <div className='d-flex flex-column site-container' /* className='App' */>
        {/*    <ToastContainer position='bottom-center' limit={1} /> */}
        <Navbar bg='dark' variant='dark'>
          <Container>
            <LinkContainer to='/'>
              <Navbar.Brand>amaiie</Navbar.Brand>
            </LinkContainer>
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
                <NavDropdown title={userInfo.username} id='basic-nav-dropdown'>
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
                    onClick={signoutHanlder}
                  >
                    Sign Out
                  </Link>
                </NavDropdown>
              ) : (
                <Link className='nav-link' to='/signin'>
                  Sign In
                </Link>
              )}
            </Nav>
          </Container>
        </Navbar>
        <header className='App-header'>
          {/*  <Link to='/'> amaiie</Link> */}
        </header>
        <main>
          <Container className='mt-3'>
            <Routes>
              <Route path='/product/:slug' element={<ProductScreen />} />
              <Route path='/cart' element={<CartScreen />} />
              <Route path='/search' element={<SearchScreen />} />
              <Route path='/signin' element={<SigninScreen />} />
              <Route path='/signup' element={<SignupScreen />} />
              <Route path='/placeorder' element={<PlaceOrderScreen />} />
              <Route path='/order/:id' element={<OrderScreen />} />
              <Route path='/shipping' element={<ShippingAddressScreen />} />
              <Route path='/payment' element={<PaymentMethodScreen />} />
              <Route path='/' element={<HomeScreen />}></Route>
              <Route
                path='/admin/products'
                element={
                  <AdminRoute>
                    <ProductListScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path='/admin/product/:id'
                element={
                  <AdminRoute>
                    <ProductEditScreen />
                  </AdminRoute>
                }
              ></Route>
            </Routes>
          </Container>
          {/*  <Nav className='flex-column text-white w-100 p-2'>
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
          </Nav> */}
        </main>
        <footer>
          <div className='text-center'>All right reseved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
