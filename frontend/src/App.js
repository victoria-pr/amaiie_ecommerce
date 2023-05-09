import data from "./data";

/* import logo from "./logo.svg";
import "./App.css";
 */
function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <a href='/'> amaiie</a>
      </header>

      <main>
        <h1>featured Products</h1>
        <div className='products'>
          {data.products.map((product) => (
            <div className='product' key={product.slug}>
              <a href={`/product/${product.slug}`}>
                <img src={product.image} alt={product.nameproduct} />
              </a>
              <div className='product-info'>
                <a href={`/product/${product.slug}`}>
                  <p>{product.nameproduct}</p>
                </a>
                <p>
                  <strong>{product.price}€</strong>
                </p>

                <button>Add to cart</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
