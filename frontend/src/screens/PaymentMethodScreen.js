import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CheckoutSteps from "../components/CheckoutSteps";
import { Store } from "../Store";
import "../App.css";
//PANTALLA DE METODO DE PAGO
//HOOK useNavigate: para obtener acceso a la función navegación
//HOOK useState: para cambios de estado en el método de pago Paypal
export default function PaymentMethodScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;

  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || "PayPal"
  );
  //HOOK useEffect: para verificar si hay una dirección de envío y si no hay te redirige a la selección de dirección de envío
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  //Para guardar el método de pago seleccionado, almacena el método y te lleva al siguiente proceso de compra
  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethodName });
    localStorage.setItem("paymentMethod", paymentMethodName);
    navigate("/placeorder");
  };
  //Componente que renderiza la interfaz (Form + Botón)
  //CheckOutSteps: pasos del proceso de compra
  //Helmet: para establecer el título de la página
  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className='container small-container'>
        <Helmet>
          <title>Método de pago</title>
        </Helmet>
        <h1 className='my-3 color-verde'>Método de pago</h1>
        <Form onSubmit={submitHandler}>
          <div className='mb-3'>
            <Form.Check
              type='radio'
              id='PayPal'
              label='PayPal'
              value='PayPal'
              checked={paymentMethodName === "PayPal"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <Form.Check
              type='radio'
              id='Stripe'
              label='Stripe'
              value='Stripe'
              checked={paymentMethodName === "Stripe"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <Button className='custom-button' type='submit'>
              Continuar
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
