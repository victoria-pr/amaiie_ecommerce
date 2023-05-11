import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import CartScreen from "./screens/CartScreen";

function App() {
  return (
    <BrowserRouter>

    <div className="d-flex flex-column site-container">
      <header>
      <Navbar bg="dark" variant="dark">
      <Container>
        <LinkContainer to="/">
        <Navbar.Brand>Madein90s</Navbar.Brand>
        </LinkContainer>
      </Container>
      </Navbar>
      {/* <Nav className="me-auto">
        <Link to="/cart" className="nav-link">
          Cart
          {cartItems.length > 0 && (
            <Badge pill bg="danger">
              {cart.cartItems.reduce((a,c) => a + c.quantity, 0)}
            </Badge>
          )}
        </Link> */}
      </header>
      <main> 
        <Container>
        <Routes>
          <Route path="/product/:slug" element={<ProductScreen />}/>
          <Route path="/cart" element={<CartScreen/>}/>
          <Route path="/" element={<HomeScreen />}/>

        </Routes>
        </Container>
      </main>
      <footer>
        <div className="text-center">All rights reserved</div>
      </footer>
    </div>

    </BrowserRouter>
  );
}

export default App;