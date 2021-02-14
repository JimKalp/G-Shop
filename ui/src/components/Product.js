import React from "react";
import contextWrapper from "../context/contextWrapper";

const Product = (props) => {
  const product = props.product;
  const addToCart = props.context.addToCart;
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
        <button onClick={() => addToCart(product)} className="btn btn-primary">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default contextWrapper(Product);
