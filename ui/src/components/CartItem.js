import React, { useState } from "react";
import contextWrapper from "../context/contextWrapper";
import "bootstrap/dist/css/bootstrap.min.css";

const CartItem = (props) => {
  const [st, setSt] = useState(false);
  const { cartItem, cartKey } = props;
  return (
    <div className="row">
      <div className="col-lg-8">
        <div className="mb-3">
          <div className="row mb-4">
            <div className="col-md-5 col-lg-3 col-xl-3">
              <figure className="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
                <img className="img-fluid w-100"
                  src={cartItem.img.url}
                  alt="prod"
                  style={{ width: "50px", height: "50px" }}
                />
              </figure>
            </div>
            <div className="d-flex justify-content-between">
              <b style={{ textTransform: "capitalize" }}>
                {cartItem.description}{" "}
                <span className="tag is-primary">${cartItem.price}</span>
              </b>
            </div>
            <button
              className="btn btn-danger"
              onClick={() => {
                props.removeFromCart(cartKey);
                setSt(!st);
              }}
            >
              X
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default contextWrapper(CartItem);
