import Home from "./pages/Home";
import "./App.css";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  const user = true;
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />

        <Route path="/products/:category" element={<ProductList />} />

        <Route path="/products/:id" element={<Product />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/register" element={user ? <Home /> : <Register />} />
      </Routes>
    </Router>
  );
}

export default App;
