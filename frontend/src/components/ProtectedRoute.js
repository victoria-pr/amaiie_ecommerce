import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Store } from "../Store";
//Verificamos si el usuario está autentificado y si no lo está le enviamos al Sign In
//De esta manera protegemos el acceso a las rutas de la aplicación
export default function ProtectedRoute({ children }) {
  const { state } = useContext(Store);
  const { userInfo } = state;
  return userInfo ? children : <Navigate to='/signin' />;
}
