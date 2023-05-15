import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function CheckoutSteps(props) {
  return (
    <div>
      <Row className='checkout-steps'>
        <Col className={props.step1 ? "active" : ""}> Sign-In</Col>
        <Col className={props.step2 ? "active" : ""}> Shipping</Col>
        <Col className={props.step3 ? "active" : ""}> Payment</Col>
        <Col className={props.step4 ? "active" : ""}> Place Order</Col>
      </Row>
    </div>
  );
}

<<<<<<< HEAD
export default CheckoutSteps; 
=======
export default CheckoutSteps;
>>>>>>> 31851ef7e9a9f5a12d5c73757792042e0ddd3995
