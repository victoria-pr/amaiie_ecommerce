import { Link } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useContext, useReducer } from "react";
import { Store } from "../Store";
import "../css/ArtistScreen.scss";
import { Icon } from "@iconify/react";

function Product(props) {
  const { product } = props;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (item.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };
  /* 
  return (
    <Card key={product.slug}>
      <Link to={`/product/${product.slug}`}>
        <img
          src={`http://localhost:5000/fotoproducto/${product.image}`}
          alt={product.nameproduct}
        />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.nameproduct}</Card.Title>
        </Link>
        <Link to={`/user/${product.user}`}>
          <Card.Title>{product.user}</Card.Title>
        </Link>
        <Card.Text>{product.price}€</Card.Text>
        {product.countInStock === 0 ? (
          <Button variant='light' disabled>
            Out of stock
          </Button>
        ) : (
          <Button onClick={() => addToCartHandler(product)}>Add to cart</Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default Product; */

  return (
    <div>
      {/* --------------------------
       */}

      <div class='shell'>
        <div class='container'>
          <div class='row'>
            <div class='col-md-12'>
              <div class='wsk-cp-product'>
                <div class='wsk-cp-img'>
                  <img
                    src={product.image}
                    alt='Product'
                    class='img-responsive'
                  />
                </div>
                <div class='wsk-cp-text'>
                  <div class='category'>
                    <span
                      className='custom-link-text'
                      onClick={() => {
                        // Handle the click event and navigate programmatically
                        // For example:
                        window.location.href = `/user/${product.user}`;
                      }}
                    >
                      {product.user}
                    </span>
                  </div>
                  <div class='title-product'>
                    <h3>
                      <span
                        className='custom-link-text'
                        onClick={() => {
                          // Handle the click event and navigate programmatically
                          // For example:
                          window.location.href = `/product/${product.slug}`;
                        }}
                      >
                        {product.nameproduct}
                      </span>
                      {/* <Link to={`/product/${product.slug}`}>
                        {product.nameproduct}
                      </Link> */}
                    </h3>
                  </div>
                  <div class='description-prod'>{product.category}</div>
                  <div class='card-footer'>
                    <div class='wcf-left'>
                      <span class='price'>{product.price}€</span>
                    </div>
                    <div class='wcf-right'>
                      {product.countInStock === 0 ? (
                        <span className='out-of-stock'>Out of stock</span>
                      ) : (
                        <span
                          className='add-to-cart'
                          onClick={() => addToCartHandler(product)}
                        >
                          Add to cart
                        </span>
                      )}
                      {/* <a href='#' class='buy-btn'>
                        <Icon className='icon' icon='zmdi:shopping-basket' />
                      </a> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* -----------------
       */}
    </div>
  );
}

export default Product;
