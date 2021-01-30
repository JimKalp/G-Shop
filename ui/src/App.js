import ProductList from "./components/ProductList";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/navbar.component";
import CreateUser from "./components/create-user.component";
import Login from "./components/Login";
import { UserContext } from "./context/user_context";

const products = [
  {
    id: 1,
    description: "Gadget",
    price: 12.99,
    category: "tech",
  },
  {
    id: 2,
    description: "Gadget",
    price: 19.99,
    category: "tech",
  },
  {
    id: 3,
    description: "Laptop",
    price: 192.99,
    category: "tech",
  },
];

function App() {
  const [username, setUsername] = useState("Guest");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const login = (name) => {
    setUsername(name);
    setIsAuthenticated(true);
  };
  const logout = () => {
    setUsername("Guest");
    setIsAuthenticated(false);
  };
  const state = {
    username,
    isAuthenticated,
    login,
    logout,
  };
  return (
    <Router>
      <UserContext.Provider value={state}>
        <Navbar />
        <div className="container">
          <br />
          <Route path="/user" component={CreateUser} />
          <Route path="/login" component={Login} />
          <Route
            exact
            path="/"
            render={(props) => <ProductList {...props} products={products} />}
          />
        </div>
        {/* <ProductList products={products} /> */}
      </UserContext.Provider>
    </Router>
  );
}

export default App;
