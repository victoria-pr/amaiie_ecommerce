import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";  
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
import SearchBox from "./components/SearchBox";
import SearchScreen from "./screens/SearchScreen";
import AdminRoute from "./components/AdminRoute";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getError } from "./utils";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import AvisoLegal from "./screens/AvisoLegal";
import Button from "react-bootstrap/esm/Button";
import ContactoScreen from "./screens/ContactoScreen";
import NosotrosScreen from "./screens/NosotrosScreen";
import PrivacidadScreen from "./screens/PrivacidadScreen";
import CookiesScreen from "./screens/CookiesScreen";
import ProfileScreen from "./screens/ProfileScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import ArtistScreen from "./screens/ArtistScreen";
import ProtectedRoute from "./components/ProtectedRoute";
import EditArtistScreen from "./screens/EditArtistScreen";
import ProductArtistScreen from "./screens/ProductArtistScreen";

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { fullBox, cart, userInfo } = state;

  const signoutHanlder = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    window.location.href = "/signin";
  };
 
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await Axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);

  return (
    <BrowserRouter>
      {/* <div
        className={
          sidebarIsOpen
            ? fullBox
              ? "site-container active-cont d-flex flex-column full-box"
              : "site-container active-cont d-flex flex-column"
            : fullBox
            ? "site-container d-flex flex-column full-box"
            : "site-container d-flex flex-column"
        }
      > */}
      <div className='d-flex flex-column site-container' /* className='App' */>
        <ToastContainer position='bottom-center' limit={1} />
        <Navbar bg='dark' variant='dark' className='fixed-top'>
          <Container>
            <LinkContainer to='/'>
              <Navbar.Brand>amaiie</Navbar.Brand>
            </LinkContainer>
            {/*  <Navbar.Toggle aria-controls='basic-navbar-nav' />
              <Navbar.Collapse id='basic-navbar-nav'> */}
            <SearchBox />

            <Nav className='ml-auto'>
              <Link className='nav-link' to='/contacto'>
                Contacto
              </Link>
              <Link className='nav-link' to='/nosotros'>
                Nosotros
              </Link>
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
              {userInfo && userInfo.isArtist && (
                <NavDropdown title='Artist' id='artist-nav-dropdown'>
                  <LinkContainer to="/editprofile">
                    <NavDropdown.Item>Edit Profile</NavDropdown.Item>
                  </LinkContainer>
                 {/*  <LinkContainer to="/artistproducts">
                    <NavDropdown.Item>Productos</NavDropdown.Item>
                  </LinkContainer> */}
                </NavDropdown>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='admin-nav-dropdown'>
              {/* <LinkContainer to='/admin/dashboard'>
                    <NavDropdown.Item>Dashboard</NavDropdown.Item>
                  </LinkContainer> */}
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
          </Container>
        </Navbar>
        
        <header className='App-header'>
          {/*  <Link to='/'> amaiie</Link> */}
        </header>
        </div>
        <div
        className={
          sidebarIsOpen
            ? "active-nav side-navbar d-flex justify-content-between flex-wrap flex-column"
            : "side-navbar d-flex justify-content-between flex-wrap flex-column"
        }
      >
        <Nav className='flex-column text-white w-100 p-2'>
          {/* <Nav.Item>
            <strong>Categories</strong>
          </Nav.Item> */}
          {/*  {categories.map((category) => (
            <Nav.Item key={category}>
              <LinkContainer
                to={{ pathname: "/search", search: `category=${category}` }}
                onClick={() => setSidebarIsOpen(false)}
              >
                <Nav.Link>{category}</Nav.Link>
              </LinkContainer>
            </Nav.Item>
          ))} */}
        </Nav>
      </div>
        <main>
          <Container className='mt-3'>
            <Routes>
              <Route path='/' element={<HomeScreen />}></Route>
              <Route path='/contacto' element={<ContactoScreen />} />
              <Route path='/avisolegal' element={<AvisoLegal />} />
              <Route path='/nosotros' element={<NosotrosScreen />} />
              <Route path='/privacidad' element={<PrivacidadScreen />} />
              <Route path='/cookies' element={<CookiesScreen />} />
              <Route path='/product/:slug' element={<ProductScreen />} />
              <Route path='/user/:username' element={<ArtistScreen />} />
              <Route path='/cart' element={<CartScreen />} />
              <Route path='/search' element={<SearchScreen />} /> 
              <Route path='/signin' element={<SigninScreen />} />
              <Route path='/signup' element={<SignupScreen />} />
              <Route path='/editprofile' element={<EditArtistScreen />} />
              <Route path='/placeorder' element={<PlaceOrderScreen />} />
              <Route path='/artistproducts' element={<ProductArtistScreen />} />
              <Route path='/profile' 
              element={
              <ProtectedRoute>
                <ProfileScreen />
                </ProtectedRoute>} />
              <Route path='/order/:id' 
              element={
              <ProtectedRoute>
                <OrderScreen />
                </ProtectedRoute>} />
              <Route path="/orderhistory"
              element={
                <ProtectedRoute>
              <OrderHistoryScreen />
              </ProtectedRoute>} />
              <Route path='/shipping' element={<ShippingAddressScreen />} />
              <Route path='/payment' element={<PaymentMethodScreen />} />
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
        </main>
        
      <footer>
        <div className='text-center'>
          <p>
            Copyright © 2023 ·
            <Routes>
              <Route path='/Avisolegal' component={AvisoLegal} />
            </Routes>
            <Link to='/avisolegal'>Aviso legal</Link> .
            <Link to='/privacidad'>Política de privacidad</Link> .
            <Link to='/cookies'>Política de cookies</Link>
          </p>
        </div>
      </footer>
    </BrowserRouter>
  );
}

export default App;