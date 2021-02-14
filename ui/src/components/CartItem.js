import React, { useState } from "react";
import contextWrapper from "../context/contextWrapper";

const CartItem = (props) => {
  const [st, setSt] = useState(false);
  const { cartItem, cartKey } = props;
  return (
    <div className=" column is-half">
      <div className="box">
        <div className="media">
          <div className="media-left">
            <figure className="image is-64x64">
              <img
                src={cartItem.img.url}
                alt="prod"
                style={{ width: "50px", height: "50px" }}
              />
            </figure>
          </div>
          <div className="media-content">
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
  );
};

export default contextWrapper(CartItem);
