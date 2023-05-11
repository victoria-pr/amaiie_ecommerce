import { useParams } from "react-router-dom";
import { useEffect, useReducer } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { Helmet } from "react-helmet-async";
import Card from "react-bootstrap/Card";
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
function ProductScreen() {
  const params = useParams();
  const { slug } = params;
  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(`api/products/slug/${slug}`);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchData();
  }, [slug]);
  return loading ? (
    <div>loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div>
      <Row>
        <Col md={6}>
          <img
            className='img-large'
            src={product.image}
            alt={product.nameproduct}
          ></img>
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <title>{product.nameproduct}</title>
            <ListGroup.Item>
              <Helmet>
                <title>{product.nameproduct}</title>
              </Helmet>
              <h1>{product.nameproduct}</h1>
            </ListGroup.Item>
            <ListGroup.Item>Precio : {product.price}€</ListGroup.Item>
            <ListGroup.Item>Descripción : {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant='flush'>
                <ListGroup>
                  <ListGroup.Item>
                    <Row>
                      <Col>Precio:</Col>
                      <Col>{product.price}€</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? (
                          <Badge bg='success'>In stock</Badge>
                        ) : (
                          <Badge bg='danger'>Unavailable</Badge>
                        )}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    {product.countInStock > 0 && (
                      <ListGroup.Item>
                        <div classname='d-grid'>
                          <Button variant='primary'>add to cart</Button>
                        </div>
                      </ListGroup.Item>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
export default ProductScreen