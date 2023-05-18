import React, { useContext, useEffect, useReducer } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Store } from '../Store';
import { getError } from '../utils'
import Product from "../components/Product";

const reducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_REQUEST':
        return { ...state, loading: true };
      case 'FETCH_SUCCESS':
        return { ...state, products: action.payload, loading: false };
      case 'FETCH_FAIL':
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };

export default function ProductArtistScreen() {
    const { state } = useContext(Store);
    const { userInfo } = state;
  
    const [{ loading, error, user }, dispatch] = useReducer(reducer, {
      user: null,
      loading: true,
      error: '',
    });
  
    useEffect(() => {
      const fetchData = async () => {
        dispatch({ type: 'FETCH_REQUEST' });
        try {
          const response = await axios.get(`/api/users/${user.products}`);
          const userData = response.data;
          dispatch({ type: 'FETCH_SUCCESS', payload: userData });
        } catch (error) {
          dispatch({
            type: 'FETCH_FAIL',
            payload: getError(error),
          });
        }
      };
      fetchData();
    }, [userInfo]);
  
    return (
      <div>
        <div className='products'>
          {loading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox variant='danger'> {error}</MessageBox>
          ) : (
            <Row>
              {user && user.products.map((product) => (
                <Col key={product.slug} sm={6} md={4} lg={3} className='mb-3'>
                  <Product product={product}></Product>
                </Col>
              ))}
            </Row>
          )}
        </div>
      </div>
    );
  }
  
