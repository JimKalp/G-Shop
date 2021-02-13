import ProductList from "./components/ProductList";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/navbar.component";
import CreateUser from "./components/create-user.component";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AddProduct from "./components/AddProduct";
import { UserContext } from "./context/user_context";
import Footer from "./components/Footer";
import Cart from './components/Cart';
axios.defaults.baseURL = "http://localhost:8080";

function usePersistedState(key, defaultValue) {
  const [state, setState] = useState(
    () => JSON.parse(localStorage.getItem(key)) || defaultValue
  );
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
}

function App() {
  const [username, setUsername] = usePersistedState("username", "Guest"); // useState("Guest");
  const [role, setRole] = usePersistedState("role", "guest");
  const [products, setProducts] = usePersistedState("products", []);
  const [cart, setCart] = usePersistedState("cart", {});
  const [isAuthenticated, setIsAuthenticated] = usePersistedState(
    "auth",
    false
  );
  const login = (name, _role = "user") => {
    setUsername(name);
    setIsAuthenticated(true);
    setRole(_role);
  };
  const addProducts = (product) => {
    setProducts([...products, product]);
  };
  const logout = () => {
    setUsername("Guest");
    setRole("guest");
    setIsAuthenticated(false);
  };
  const state = {
    username,
    role,
    isAuthenticated,
    login,
    logout,
    cart: {},
  };
  const fetchProducts = async () => {
    const res = await axios.get("/products");
    return res.data;
  };
  useEffect(() => {
    const getProducts = async () => {
      const prods = await fetchProducts();
      setProducts(prods);
    };
    
    getProducts();

    let cart = localStorage.getItem("cart");
    cart = cart? JSON.parse(cart) : {};
    
  }, [setProducts], [setCart]);


  return (
    <Router>
      <UserContext.Provider value={state}>
        <Navbar />
        <div className="container">
          <br />
          <Route path="/user" component={CreateUser} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/MyCart" component={Cart} />
          <Route
            path="/addProducts"
            render={(props) => (
              <AddProduct {...props} addProducts={addProducts} />
            )}
          />
          <Route
            exact
            path="/"
            render={(props) => <ProductList {...props} products={products} />}
          />
        </div>
        <Footer />
      </UserContext.Provider>
    </Router>
  );
}

export default App;
