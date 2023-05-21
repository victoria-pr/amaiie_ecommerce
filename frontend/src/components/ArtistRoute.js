//Para verificar si el usuario es artist antes de permitirle ver contenido de una ruta
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Store } from "../Store";
export default function ArtistRoute({ children }) {
  //Se utiliza el HOOK UseContext para acceder al contexto de la aplicación (componente Store)
  const { state } = useContext(Store);
  const { userInfo } = state;
  //Si la info del usuario existe y tiene rol de artist, se renderizan los children proporcionados y si no vuelve al Sign in
  return userInfo && userInfo.isAdmin ? children : <Navigate to='/signin' />;
}
