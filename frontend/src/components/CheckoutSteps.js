import React from "react";
//Estilo en cuadrícula de Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//Definimos el componente Checkout que recibe 4 PROPS del proceso de compra como argumento
function CheckoutSteps(props) {
  return (
    <div>
      <Row className='checkout-steps'>
        <Col className={props.step1 ? "active" : ""}> Inicio sesión</Col>
        <Col className={props.step2 ? "active" : ""}> Envío</Col>
        <Col className={props.step3 ? "active" : ""}> Pago</Col>
        <Col className={props.step4 ? "active" : ""}> Realizar pedido</Col>
      </Row>
    </div>
  );
}

export default CheckoutSteps;
