import React, { useContext, useEffect, useReducer } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'react-bootstrap';
import Axios from "axios";
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Store } from '../Store';
import { getError } from '../utils'
import { toast } from "react-toastify";

const reducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_REQUEST':
        return { ...state, loading: true };
      case 'FETCH_SUCCESS':
        return { ...state, products: action.payload, loading: false };
      case 'FETCH_FAIL':
        return { ...state, loading: false, error: action.payload };

     case "DELETE_SUCCESS":
      return {
        ...state,
        loadingDelete: false,
        successDelete: true,
      };
      case "DELETE_RESET":
      return { ...state, loadingDelete: false, successDelete: false };
   default:
        return state;
  };
};

export default function ProductArtistScreen() {
    const { state } = useContext(Store);
    const { userInfo } = state;
  
    const [{ loading, error, products, successDelete }, dispatch] = useReducer(reducer, {
      loading: true,
      error: '',
    });
    
    useEffect(() => {
      const fetchData = async () => {
        dispatch({ type: 'FETCH_REQUEST' });
        try {
          const products = await axios.get(`/api/users/${userInfo.username}/products`)
          const productsData = products.data;
          console.log(productsData)

          dispatch({ type: 'FETCH_SUCCESS', payload: productsData });
        } catch (error) {
          dispatch({ type: 'FETCH_FAIL', payload: getError(error),});
        }
      };
       if (successDelete) {
      dispatch({ type: "DELETE_RESET" });
    } else {
      fetchData();
    }
    }, [userInfo, successDelete]);

    const deleteHandler = async (product) => {
      if (window.confirm("Are you sure to delete?")) {
        try {
          await Axios.delete(`/api/products/${product._id}`, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          });
          toast.success("product deleted successfully");
          dispatch({ type: "DELETE_SUCCESS" });
        } catch (err) {
          toast.error(getError(err));
          dispatch({
            type: "DELETE_FAIL",
          });
        }
      }
    };

    return (
      <div>
        <Helmet>
          <title>Productos</title>
        </Helmet>
  
        <h1>Productos</h1>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>IMAGEN</th>
                <th>NAME</th>
                <th>USER</th>
                <th>DESCRIPTION</th>
                <th>FECHA CREACIÓN</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td> <img src={`http://localhost:5000/fotoproducto/${product.image}`} alt={product.nameproduct} className="small"></img></td>
                  <td>{product.nameproduct}</td>
                  <td>{product.user}</td>
                  <td>{product.description}</td>
                  <td>{product.createdAt.substring(0, 10)}</td>
                  <td>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => deleteHandler(product)}
                    >
                      Borrar
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
