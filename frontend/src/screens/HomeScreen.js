//import data from "../data";
//import { Link } from "react-router-dom";
import { useEffect, useReducer } from "react";
import Axios from "axios";
import logger from "use-reducer-logger";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Product from "../components/Product";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import "../css/GalleryScreen.css";

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

function HomeScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: "",
  });
  //const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await Axios.get("api/products/");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }

      // setProducts(result.data);
    };
    fetchData();
  }, []);

  return (
    <div>
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
                <div className='gallery-item-text'>Todas</div>
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
                <div className='gallery-item-text'>Jabones</div>
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
          </Row>
        </div>
      </div>
      <Helmet>
        <title>Amaiie</title>
      </Helmet>
      <h1>Productos</h1>
      <div className='products'>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant='danger'> {error}</MessageBox>
        ) : (
          <Row>
            {products.map((product) => (
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
export default HomeScreen;
