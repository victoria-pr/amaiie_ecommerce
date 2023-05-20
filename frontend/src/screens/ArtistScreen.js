import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useReducer, useState, useContext } from "react";
import { getError } from "../utils";
import { Store } from "../Store";
import Product from "../components/Product";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import "../css/ArtistScreen.scss";
import "../App.css";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, user: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function ArtistScreen() {
  //const navigate = useNavigate();
  const params = useParams();
  const { username } = params;
  const [products, setProducts] = useState([]);

  const [{ loading, error, user }, dispatch] = useReducer(reducer, {
    user: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const response = await axios.get(`/api/users/username/${username}`);
        const userData = response.data;

        const products = await axios.get(`/api/users/${username}/products`);
        const productsData = products.data;
        console.log(productsData);
        setProducts(productsData);

        dispatch({ type: "FETCH_SUCCESS", payload: userData });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, [username]);

  return (
    <div>
      {/* --------------------------
       */}
      {/*  <div className='fotocontainer'>
        <div className='fotocard fotocard0'>
          <div className='fotoborder'>
            <h2>Unai</h2>
            <div className='icons'>
              <i className='fa fa-codepen' aria-hidden='true'></i>
              <i className='fa fa-instagram' aria-hidden='true'></i>
              <i className='fa fa-dribbble' aria-hidden='true'></i>
              <i className='fa fa-twitter' aria-hidden='true'></i>
              <i className='fa fa-facebook' aria-hidden='true'></i>
            </div>
          </div>
        </div>
      </div>
 */}
      {/* -----------------
       */}

      {/*   <div>
        <h1>{user.username}</h1>
      </div>
      <div>
        <h1>{user.email}</h1>
      </div>
      <div>
        <img
          src={`http://localhost:5000/uploads/${user.image}`}
          alt={user.username}
        />
      </div>
      <div>
        <h1>{user.description}</h1>
      </div>
 */}
      {/*  <div>
        <h1>{user.username}</h1>
      </div>
      <div>
        <h1>{user.email}</h1>
      </div> */}
      <div>
        <div className='infoartist'>
          <div>
            <h3 className='color-verde'>{user.username}</h3>
          </div>
          <div>
            <p>{user.description}</p>
          </div>
        </div>
        <div className='infoimagen'>
          <div className='decorative-line'></div>
          <div className='decorative-lineh'></div>
          <div className='decorative-lineV'></div>
          <div className='item2'>
            <div className='item'>
              <img
                src={`http://localhost:5000/uploads/${user.image}`}
                alt={user.username}
                className='image-artist'
              />
            </div>
          </div>
        </div>
      </div>

      {/* <div className='item3'>
        <div className='item'>
          <img
            src={`http://localhost:5000/uploads/${user.image}`}
            alt={user.username}
            className='image-artist'
          />
        </div>
      </div> */}

      <Row>
        {products.map((product) => (
          <Col key={product.slug} sm={6} md={4} lg={3} className='mb-3'>
            <Product product={product}></Product>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default ArtistScreen;
