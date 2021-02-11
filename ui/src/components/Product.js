import React from "react";

const Product = ({ product }) => {
  return (
    <div className="card-body card-container" style={{ display: "grid" }}>
      <img
        src={product.img.url}
        alt=""
        style={{ width: "200px", height: "200px" }}
      />
      <p>{product.description}</p>
      <p>{product.price}</p>
      <p>{product.category}</p>
      <div>
        <button className="btn btn-primary">Add to Cart</button>
      </div>
    </div>
  );
};

export default Product;
