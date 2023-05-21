import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { StoreProvider } from "./Store";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
//método que proporciona una API experimental para renderizar componentes de React de manera concurrente
//Objetivo: renderizar el componente raiz de la aplicación, manejar su estado global, manejar el título de la página de forma asíncrona y cargar el script de Paypal
//Para activar verificaciones y advertencias de rendimiento en modo desarrollo
//Ayudar a identificar y solucionar problemas potenciales en la aplicación
//Informa de las métricas de rendimiento de la web
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StoreProvider>
      <HelmetProvider>
        <PayPalScriptProvider deferLoading={true}>
          <App />
        </PayPalScriptProvider>
      </HelmetProvider>
    </StoreProvider>
  </React.StrictMode>
);

reportWebVitals();
