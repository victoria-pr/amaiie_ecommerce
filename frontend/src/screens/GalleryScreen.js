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

const GalleryScreen = () => {
  const [showApp, setShowApp] = useState(false);

  const handleButtonClick = () => {
    setShowApp(true);
  };

  return (
    <div>
      {showApp ? (
        <React.StrictMode>
          <StoreProvider>
            <HelmetProvider>
              <PayPalScriptProvider deferLoading={true}>
                <App />
              </PayPalScriptProvider>
            </HelmetProvider>
          </StoreProvider>
        </React.StrictMode>
      ) : (
        /*  <div>
          <div className='gallery-grid'>
            <div className='gallery-item1'>
              <img
                src='./images/pintura.png'
                alt='Imagen 1'
                className='gallery-image'
              />
              <div className='gallery-item-text'>Texto del hover</div>
            </div>
            <div className='gallery-item2'>
              <img
                src='./images/joyeria.png'
                alt='Imagen 2'
                className='gallery-image'
              />
              <div className='gallery-item-text'>Texto del hover</div>
            </div>
            <div className='gallery-item3'>
              <img
                src='./images/bolas.png'
                alt='Imagen 3'
                className='gallery-image'
              />
              <div className='gallery-item-text'>Texto del hover</div>
            </div>
            <div className='gallery-item4'>
              <img
                src='./images/ceramic.png'
                alt='Imagen 4'
                className='gallery-image'
              />
              <div className='gallery-item-text'>Texto del hover</div>
            </div>
            <div className='gallery-item5'>
              <img
                src='./images/decor.png'
                alt='Imagen 5'
                className='gallery-image'
              />
              <div className='gallery-item-text'>Texto del hover</div>
            </div>
          </div>
          
          <button onClick={handleButtonClick}>Mostrar App</button>
        </div> */

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
                  <div className='gallery-item-text'>Ceramica</div>
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
              {/* Agrega las otras celdas aquí */}
              {/* Ejemplo:
            <Col md={4} className="gallery-item6">
              <div className="gallery-item">
                <img
                  src="./images/im6.png"
                  alt="Imagen 6"
                  className="gallery-image"
                />
                <div className="gallery-item-text">Texto del hover</div>
              </div>
            </Col>
            */}
            </Row>
          </div>

          <button onClick={handleButtonClick}>Mostrar App</button>
        </div>
      )}
    </div>
  );
};

export default GalleryScreen;
