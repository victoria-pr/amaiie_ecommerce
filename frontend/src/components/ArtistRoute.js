import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Store } from "../Store";

export default function ArtistRoute({ children }) {
  const { state } = useContext(Store);
  const { userInfo } = state;
  return userInfo && userInfo.isArtist ? children : <Navigate to='/signin' />;
}
