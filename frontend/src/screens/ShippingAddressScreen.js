import { Helmet } from "react-helmet-async";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState, useContext, useEffect } from "react";
import { Store } from "../Store";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import "../App.css";
//Función del componente de pantalla de envío
//HOOK useNavigate: para las funciones de navegación por la web
//HOOK useContext para cambio del estado del contexto Store
//HOOK useState: para cambios de estado de los datos de envío
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
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );

  //Si no hay un userInfo válido, se redirige al usuario a la página de inicio de sesión
  useEffect(() => {
    if (!userInfo) {
      navigate("/signin?redirect=/shipping");
    }
  }, [userInfo, navigate]);
  const [country, setCountry] = useState(shippingAddress.country || "");
  //Función que se ejecuta cuando se envía el formulario
  //Utilizamos la función dispatch del contexto para enviar una acción al reducer de la aplicación con los datos de envío

  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: {
        fullName,
        address,
        city,
        postalCode,
        country,
      },
    });
    //almacenamiento en el localStorage
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
    //Redirigimos al usuario a la página de pago
    navigate("/payment");
  };
  //El componente renderiza una estructura JSX (similar a HTML) con el formulario de envío
  return (
    <div>
      <Helmet>
        <title>Dirección de envío</title>
      </Helmet>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <div className='container small-container'>
        <h1 className='my-3 color-verde'> Dirección de envío</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className='mb-3' controlId='fullName'>
            <Form.Label> Nombre completo </Form.Label>
            <Form.Control
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='address'>
            <Form.Label> Dirección </Form.Label>
            <Form.Control
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='city'>
            <Form.Label> Ciudad </Form.Label>
            <Form.Control
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='postalcode'>
            <Form.Label> Código postal </Form.Label>
            <Form.Control
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='country'>
            <Form.Label> País </Form.Label>
            <Form.Control
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </Form.Group>
          <div className='mb-3'>
            <Button className='custom-button' variant='primary' type='submit'>
              Continuar
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
