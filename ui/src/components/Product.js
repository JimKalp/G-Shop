import React from "react";
import ProductService from "../services/productService";
import contextWrapper from "../context/contextWrapper";
import { Link } from "react-router-dom";

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
      <p>{product.price}$</p>
      <p>{product.category}</p>
      <div>
        <button
          className="btn btn-primary"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
        {props.context.role === "admin" && (
          <>
            <Link to={`/edit/${product._id}`}>
              <button className="btn btn-success">Edit</button>
            </Link>
            <button
              className="btn btn-danger"
              onClick={async () => {
                await ProductService.delete(product._id);
                props.context.setProducts(
                  props.context.products.filter((p) => {
                    return p._id !== product._id;
                  })
                );
              }}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default contextWrapper(Product);
