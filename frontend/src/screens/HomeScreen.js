import { useState, useEffect, useReducer } from "react";
import axios from "axios";
import logger from "use-reducer-logger"; //ayuda a ver los cambios en el estado de la aplicación en la consola 
import Product from "../components/Product"; 

//import data from "../data";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true};
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false};
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}


function HomeScreen() {
  const [{loading, error, products}, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true, 
    error: "",
});  
//const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST"}); 
      try {
        const result = await axios.get("/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data});
      }catch(error) {
        dispatch({ type: "FETCH_FAIL", payload: error.message});
      }
      
      //setProducts(result.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Featured Products</h1>
        <div className="products">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>{error}</div>
          ) : (
          <div>
          {products.map((product) => (
          <div key={product.slug}>
          <Product product={product} />
          </div>
          ))}
          </div>
        )}
        </div>
    </div>
  );
}

export default HomeScreen;
