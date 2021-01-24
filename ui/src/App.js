import ProductList from "./components/ProductList";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/navbar.component";
import CreateUser from "./components/create-user.component";

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
  return (
    <Router>
      <Navbar />
      <div className="container">
        <br />
        <Route path="/user" component={CreateUser} />
      </div>
      <ProductList products={products} />
    </Router>
  );
}

export default App;
