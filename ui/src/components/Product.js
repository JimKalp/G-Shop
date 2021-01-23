import React from "react";

const Product = ({ product }) => {
  return (
    <div className="container">
      <p>{product.description}</p> <p>{product.price}</p>{" "}
      <p>{product.category}</p>
    </div>
  );
};

export default Product;
