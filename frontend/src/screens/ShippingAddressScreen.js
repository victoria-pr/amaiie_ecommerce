<<<<<<< HEAD
import React from "react";
=======
>>>>>>> 31851ef7e9a9f5a12d5c73757792042e0ddd3995
import { Helmet } from "react-helmet-async";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState, useContext, useEffect } from "react";
import { Store } from "../Store";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import CheckoutSteps from "../components/CheckoutSteps"; 
=======
import CheckoutSteps from "../components/CheckoutSteps";
>>>>>>> 31851ef7e9a9f5a12d5c73757792042e0ddd3995

export default function ShippingAddressScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;
  const [fullName, setFullName] = useState(shippingAddress.fullName || "");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
<<<<<<< HEAD
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || "");
  
=======
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
>>>>>>> 31851ef7e9a9f5a12d5c73757792042e0ddd3995
  useEffect(() => {
    if (!userInfo) {
      navigate("/signin?redirect=/shipping");
    }
  }, [userInfo, navigate]);
  const [country, setCountry] = useState(shippingAddress.country || "");
  const submitHandler = (e) => {
    e.preventDefault();
<<<<<<< HEAD
     ctxDispatch({
=======
    ctxDispatch({
>>>>>>> 31851ef7e9a9f5a12d5c73757792042e0ddd3995
      type: "SAVE_SHIPPING_ADDRESS",
      payload: {
        fullName,
        address,
        city,
        postalCode,
        country,
      },
    });
    localStorage.setItem(
      "shippingAddress",
      JSON.stringify({
        fullName,
        address,
        city,
        postalCode,
        country,
      })
    );
    navigate("/payment");
  };
<<<<<<< HEAD
=======

>>>>>>> 31851ef7e9a9f5a12d5c73757792042e0ddd3995
  return (
    <div>
      <Helmet>
        <title>Shipping Address</title>
      </Helmet>
<<<<<<< HEAD
      
=======
>>>>>>> 31851ef7e9a9f5a12d5c73757792042e0ddd3995
      <CheckoutSteps step1 step2></CheckoutSteps>
      <div className='container small-container'>
        <h1 className='my-3'> Shipping Address</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className='mb-3' controlId='fullName'>
            <Form.Label> Full Name </Form.Label>
            <Form.Control
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='address'>
            <Form.Label> Address </Form.Label>
            <Form.Control
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='city'>
            <Form.Label> City </Form.Label>
            <Form.Control
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='postalcode'>
            <Form.Label> Postal code </Form.Label>
            <Form.Control
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='country'>
            <Form.Label> Country </Form.Label>
            <Form.Control
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </Form.Group>
          <div className='mb-3'>
            <Button variant='primary' type='submit'>
              Continue
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 31851ef7e9a9f5a12d5c73757792042e0ddd3995
