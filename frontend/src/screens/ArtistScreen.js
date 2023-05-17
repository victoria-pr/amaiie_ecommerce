import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useReducer, useContext } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { Helmet } from "react-helmet-async";
import Card from "react-bootstrap/Card";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { getError } from "../utils";
import { Store } from "../Store";

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
        dispatch({ type: "FETCH_SUCCESS", payload: userData });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, [username]);

  /*const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
   const addToCartHandler = async () => {
     const existItem = cart.cartItems.find((x) => x._id === product._id);
     const quantity = existItem ? existItem.quantity + 1 : 1;
     if (product.countInStock < quantity) {
       window.alert("Sorry. Product is out of stock");
       return;
     }
     ctxDispatch({
       type: "CART_ADD_ITEM",
       payload: { ...product, quantity: 1 },
     });
     navigate("/cart");
   }; */

  return (
    <div>
      <h1>{user.username}</h1>
      <h1>{user.email}</h1>
    </div>
  );
}
export default ArtistScreen;
