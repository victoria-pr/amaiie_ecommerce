<<<<<<< HEAD
import { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { Store } from '../Store';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import MessageBox from '../components/MessageBox';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export default function CartScreen() {
  const navigate = useNavigate();
=======
import { useContext, useReducer } from "react";
import { Helmet } from "react-helmet-async";
import { Store } from "../Store";
import Axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import MessageBox from "../components/MessageBox";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinusCircle,
  faPlusCircle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

export default function CartScreen() {
  const navigate = useNavigate();

>>>>>>> 31851ef7e9a9f5a12d5c73757792042e0ddd3995
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const updateCartHandler = async (item, quantity) => {
<<<<<<< HEAD
    const { data } = await axios.get(`/api/products/${item._id}`); 
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    } 
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  }
  const removeItemHandler = (item) => {
    ctxDispatch({
      type: 'CART_REMOVE_ITEM',
      payload: item,
    });
  };
=======
    const { data } = await Axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }

    ctxDispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
  };
  const removeItemHandler = (item) => {
    ctxDispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

>>>>>>> 31851ef7e9a9f5a12d5c73757792042e0ddd3995
  const checkoutHandler = () => {
    navigate("/signin?redirect=/shipping");
  };

  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>
<<<<<<< HEAD
              Cart is empty. <Link to="/">Go Shopping</Link>
            </MessageBox>  
=======
              Cart is empty. <Link to='/'>Go Shopping</Link>
            </MessageBox>
>>>>>>> 31851ef7e9a9f5a12d5c73757792042e0ddd3995
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className='align-items-center'>
                    <Col md={4}>
                      <img
                        src={item.image}
                        alt={item.nameproduct}
<<<<<<< HEAD
                        className="img-fluid rounded img-thumbnail"
                      ></img>{' '}
                      <Link to={`/product/${item.slug}`}>{item.nameproduct}</Link>
                    </Col>
                    <Col md={3}>
                      <Button 
                      onClick={() => updateCartHandler(item, item.quantity - 1)}
                      variant="light"
                      disabled={item.quantity === 1}>
                      <FontAwesomeIcon icon={faMinusCircle} />
                      </Button>{" "}
                      <span>{item.quantity}</span>{" "}
                      <Button variant="light" 
                      onClick={() => updateCartHandler(item, item.quantity + 1)}
                      disabled={item.quantity === item.countInStock}> {/* puedes añadir unidades hasta alcanzar el stock que hay */}
=======
                        className='img-fluid rounded img-thumbnail'
                      ></img>{" "}
                      <Link to={`/product/${item.slug}`}>
                        {item.nameproduct}
                      </Link>
                    </Col>
                    <Col md={3}>
                      <Button
                        onClick={() =>
                          updateCartHandler(item, item.quantity - 1)
                        }
                        variant='light'
                        disabled={item.quantity === 1}
                      >
                        <FontAwesomeIcon icon={faMinusCircle} />
                      </Button>{" "}
                      <span>{item.quantity}</span>{" "}
                      <Button
                        variant='light'
                        onClick={
                          () => updateCartHandler(item, item.quantity + 1) //onClick={() => updateCartHandler(item, item.quantity + 1)}}
                        }
                        disabled={item.quantity === item.countInStock} // puedes añadir unidades hasta alcanzar el stock que hay
                      >
>>>>>>> 31851ef7e9a9f5a12d5c73757792042e0ddd3995
                        <FontAwesomeIcon icon={faPlusCircle} />
                      </Button>
                    </Col>
                    <Col md={3}>${item.price}</Col>
                    <Col md={2}>
                      <Button
<<<<<<< HEAD
                      onClick={() => removeItemHandler(item)}
                       variant="light">
                      <FontAwesomeIcon icon={faTrash} />
=======
                        variant='light'
                        onClick={() => removeItemHandler(item)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
>>>>>>> 31851ef7e9a9f5a12d5c73757792042e0ddd3995
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>
                    Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{" "}
                    items): €
                    {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
<<<<<<< HEAD
                <div className="d-grid">
                  <Button
                    type="button"
                    variant="primary"
                    onClick={checkoutHandler}
                    disabled={cartItems.length === 0}
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              </ListGroup.Item>
=======
                  <div className='d-grid'>
                    <Button
                      type='button'
                      variant='primary'
                      onClick={checkoutHandler}
                      disabled={cartItems.length === 0}
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </ListGroup.Item>
>>>>>>> 31851ef7e9a9f5a12d5c73757792042e0ddd3995
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}



