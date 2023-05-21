import React from "react";
import { useEffect, useReducer, useState } from "react";
import App from "../App";
import { HelmetProvider } from "react-helmet-async";
import "bootstrap/dist/css/bootstrap.min.css";
import { StoreProvider } from "../Store";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import "../css/GalleryScreen.css"; // Importa el archivo CSS para estilos personalizados
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//PAGINA GALERIA PRODUCTOS: Utilizamos el HOOK useState para inicializar y gestionar el estado de showApp que controla si mostrar la App o no
const GalleryScreen = () => {
  const [showApp, setShowApp] = useState(false);
  //Función que se ejecuta al hacer click en mostrar App y al actualizar el estado de showApp a true
  const handleButtonClick = () => {
    setShowApp(true);
  };
  //Devolvemos una estructura JSX (similar a HTML) que muestra la galería
  return (
    <div>
      <div>
        {/* Agrega los elementos de texto decorativo aquí */}
        <div className='decorative-text'>
          <div className='decorative-text-line'></div>
          <div className='decorative-text-content'>
            <span className='artista'>- Artistas</span>
            <span className='arte'>01 Arte ...</span>
            <span className='inspiracion'>Inspiración</span>
          </div>
        </div>

        <div className='container'>
          <Row className='gallery-grid'>
            <Col md={11} className='gallery-item1'>
              <div className='gallery-item'>
                <img
                  src='./images/pintura.png'
                  alt='Imagen 1'
                  className='gallery-image'
                />
                <div className='gallery-item-text'>Pintura</div>
              </div>
            </Col>
            <Col md={5} className='gallery-item2'>
              <div className='gallery-item'>
                <img
                  src='./images/joyeria.png'
                  alt='Imagen 2'
                  className='gallery-image'
                />
                <div className='gallery-item-text'>Joyería</div>
              </div>
            </Col>
            <Col md={5} className='gallery-item3'>
              <div className='gallery-item'>
                <img
                  src='./images/bolas.png'
                  alt='Imagen 3'
                  className='gallery-image'
                />
                <div className='gallery-item-text'>Bolas Navidad</div>
              </div>
            </Col>
            <Col md={5} className='gallery-item4'>
              <div className='gallery-item'>
                <img
                  src='./images/ceramic.png'
                  alt='Imagen 4'
                  className='gallery-image-5'
                />
                <div className='gallery-item-text'>Cerámica</div>
              </div>
            </Col>
            <Col md={10} className='gallery-item5'>
              <div className='gallery-item'>
                <img
                  src='./images/decor.png'
                  alt='Imagen 5'
                  className='gallery-image-5'
                />
                <div className='gallery-item-text'>Decoración</div>
              </div>
            </Col>
          </Row>
        </div>
        <button onClick={handleButtonClick}>Mostrar App</button>
      </div>
    </div>
  );
};

export default GalleryScreen;
