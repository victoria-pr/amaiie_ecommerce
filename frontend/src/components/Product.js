import { Link } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useContext, useReducer } from "react";
import { Store } from "../Store";

function Product(props) {
  const { product } = props;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
<<<<<<< HEAD
    const { data } = await axios.get(`/api/products/${item._id}`)
=======

    /*  const { data } = await axios.get(`/api/products/${item._id}`);
>>>>>>> 31851ef7e9a9f5a12d5c73757792042e0ddd3995
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
<<<<<<< HEAD
    }   
  
=======
    } */

    if (item.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
>>>>>>> 31851ef7e9a9f5a12d5c73757792042e0ddd3995
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };

  return (
    <Card key={product.slug}>
      <Link to={`/product/${product.slug}`}>
        <img
          src={product.image}
          className='card-img-top'
          alt={product.nameproduct}
        />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.nameproduct}</Card.Title>
        </Link>
        <Card.Text>{product.price}€</Card.Text>
<<<<<<< HEAD
=======

>>>>>>> 31851ef7e9a9f5a12d5c73757792042e0ddd3995
        {product.countInStock === 0 ? (
          <Button variant='light' disabled>
            Out of stock
          </Button>
        ) : (
<<<<<<< HEAD
        <Button onClick={() => addToCartHandler(product)}>Add to cart</Button>
=======
          <Button onClick={() => addToCartHandler(product)}>Add to cart</Button>
>>>>>>> 31851ef7e9a9f5a12d5c73757792042e0ddd3995
        )}
      </Card.Body>
    </Card>
  );
}

export default Product;
