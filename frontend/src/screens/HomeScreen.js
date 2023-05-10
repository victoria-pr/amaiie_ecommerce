//import data from "../data";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function HomeScreen() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("api/products/");
      setProducts(result.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>featured Products</h1>
      <div className='products'>
        {products.map((product) => (
          <div className='product' key={product.slug}>
            <Link to={`/product/${product.slug}`}>
              <img src={product.image} alt={product.nameproduct} />
            </Link>
            <div className='product-info'>
              <Link to={`/product/${product.slug}`}>
                <p>{product.nameproduct}</p>
              </Link>
              <p>
                <strong>{product.price}€</strong>
              </p>
              <button>Add to cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeScreen;
