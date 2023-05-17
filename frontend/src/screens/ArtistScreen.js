import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useReducer, useContext } from "react";
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

  return (
    <div> 
        <h1>{user.username}</h1>
        <h1>{user.email}</h1>
        <img src={`http://localhost:5000/uploads/${user.image}`} alt={user.username} />
        <h1>{user.description}</h1>
    </div>
    );
}
export default ArtistScreen;

/* /Users/Vicky/Desktop/Bootcamp/amaiie/backend/publicback/uploads/unai.jpg */
