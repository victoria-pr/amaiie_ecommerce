import data from "./data";
import { Link } from "react-router-dom"; //Link es un componente que nos lleva a la página del producto
//Función que devuelve los datos de todos los productos hasta el botón de añadir al carrito
function HomeScreen() {
  return (
    <div>
      <h2>
        {" "}
        "Si todo lo pudiésemos expresar con palabras, no habría sitio para el
        arte"
      </h2>
      <div className='products'>
        {data.products.map((product) => (
          //Atributo key de valor único para la función map de datos de cada producto
          <div className='product' key={product.slug}>
            <Link to={`/products/${product.slug}`}>
              <img
                src={product.image}
                width='200px'
                height='200px'
                alt={product.name}
              />
            </Link>
            <div className='product-info'>
              <Link to={`/products/${product.slug}`}>
                <p>{product.name}</p>
              </Link>
              <p>{product.brand}</p>
              <p>{product.category}</p>
              <p>
                <strong>€{product.price}</strong>
              </p>
              <button>Añadir al carrito</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeScreen;
