import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";

/* import logo from "./logo.svg";
import "./App.css";
 */
function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <header className='App-header'>
          <Link to='/'> amaiie</Link>
        </header>
        <main>
          <Routes>
            <Route path='/product/:slug' element={<ProductScreen />}></Route>
            <Route path='/' element={<HomeScreen />}></Route>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
