import React, { useContext, useEffect, useReducer } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Store } from "../Store";
import { getError } from "../utils";
import Product from "../components/Product";
//Función reducer para gestionar el estado del componente
//HOOK useReducer: maneja las acciones son "FETCH_REQUEST" para indicar la solicitud de datos, "FETCH_SUCCESS" para actualizar el estado con los datos obtenidos y "FETCH_FAIL" para los errores de la solicitud.
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
//Componente principal que Contiene la lógica y la estructura de la pantalla de productos del artista
//HOOK useContext: se obtienen los datos de userInfo del contexto Store
//HOOK useReducer: adminsitra las propiedades de loading, error y user
export default function ProductArtistScreen() {
  const { state } = useContext(Store);
  const { userInfo } = state;

  const [{ loading, error, user }, dispatch] = useReducer(reducer, {
    user: null,
    loading: true,
    error: "",
  });
  //HOOK useEffect: para realizar una solicitud HTTP para obtener los productos asociados al usuario
  //Cuando se monta el componente o cuando userInfo cambia, se ejecuta la función fetchData
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const response = await axios.get(
          `/api/users/${userInfo.username}/products`
        );
        const userData = response.data;
        console.log(userData);
        dispatch({ type: "FETCH_SUCCESS", payload: userData });
      } catch (error) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(error),
        });
      }
    };
    fetchData();
  }, [userInfo]);
  //Devolvemos un JSX (similar a HTML) con la estructura y contenido de la pantalla del artista
  //Se muestra un componente LoadingBox, si loading es true
  //Se muestra un componente MessageBox de error, si error tiene un valor o una lista de productos, si el usuario existe y tiene productos
  return (
    <div>
      <div className='products'>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant='danger'> {error}</MessageBox>
        ) : (
          <Row>
            {user &&
              user.products.map(
                (
                  product //comprueba si el usuario existe y si tiene productos los muestra
                ) => (
                  <Col key={product.slug} sm={6} md={4} lg={3} className='mb-3'>
                    <Product product={product}></Product>
                  </Col>
                )
              )}
          </Row>
        )}
      </div>
    </div>
  );
}
