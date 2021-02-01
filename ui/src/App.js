import ProductList from "./components/ProductList";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/navbar.component";
import CreateUser from "./components/create-user.component";
import Login from "./components/Login";
import Signup from "./components/Signup";
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
  const [isAuthenticated, setIsAuthenticated] = usePersistedState(
    "auth",
    false
  );
  const login = (name, _role = "user") => {
    setUsername(name);
    setIsAuthenticated(true);
    setRole(_role);
  };
  const logout = () => {
    setUsername("Guest");
    setIsAuthenticated(false);
  };
  const state = {
    username,
    role,
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
          <Route path="/signup" component={Signup} />
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
