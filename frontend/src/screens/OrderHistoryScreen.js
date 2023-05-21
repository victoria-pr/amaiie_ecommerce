import React, { useContext, useEffect, useReducer } from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Store } from "../Store";
import { getError } from "../utils";
import Button from "react-bootstrap/esm/Button";
import "../App.css";
//PANTALLA DE HISTORIAL DE PEDIDOS
// Definimos un reductor para manejar acciones como FETCH_REQUEST (solicitud de datos), FETCH_SUCCESS (éxito en la obtención de datos) y FETCH_FAIL (error al obtener datos).
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, orders: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
//HOOK useContext para acceder al estado almacenado en el contexto Store.
//HOOK useNavigate para la función de navegación por la web

export default function OrderHistoryScreen() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();
  //HOOK useReducer para el indicador de loading
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });
  //Función useEffect: realiza una solicitud a la API utilizando Axios para obtener los datos de los pedidos
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const { data } = await axios.get(
          `/api/orders/mine`,

          { headers: { Authorization: `Bearer ${userInfo.token}` } }
        );
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(error),
        });
      }
    };
    fetchData();
  }, [userInfo]);

  //Devolvemos una estructura de elementos JSX (similar a HTML) para mostrar la página de pedidos
  //Botón Ver pedido: permite al usuario navegar a la página con los detalles del pedido correspondiente
  return (
    <div>
      <Helmet>
        <title>Tus pedidos</title>
      </Helmet>

      <h1 className='color-verde-order-history'>Tus pedidos</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant='danger'>{error}</MessageBox>
      ) : (
        <table className='table'>
          <thead className='color-verde'>
            <tr>
              <th>ID</th>
              <th>FECHA</th>
              <th>TOTAL</th>
              <th>PAGADO</th>
              <th>ENVIADO</th>
              <th>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice.toFixed(2)}</td>
                <td>{order.isPaid ? order.paidAt.substring(0, 10) : "No"}</td>
                <td>
                  {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : "No"}
                </td>
                <td>
                  <Button
                    className='custom-button'
                    type='button'
                    variant='light'
                    onClick={() => {
                      navigate(`/order/${order._id}`);
                    }}
                  >
                    Ver pedido
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
