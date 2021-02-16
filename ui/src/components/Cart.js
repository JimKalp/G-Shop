import React, { useState } from "react";
import contextWrapper from "../context/contextWrapper";
import CartItem from "./CartItem";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Cart = (props) => {
  const [st, setSt] = useState(false);
  const cart = props.context.cart;
  const rem = (key) => {
    props.context.removeFromCart(key);
  };
  let history = useHistory();

  return (
    <>
      <div className="row">
      <div className="col-lg-8">
        <div className="hero is-primary">
          <div className="hero-body container">
            <h4 className="title">My Cart</h4>
          </div>
        </div>
        <br />
        <div className="row mb-4">
          {cart ? (
            <div className="col-lg-8">
              {Object.keys(cart).map((key) => {
                return (
                  <CartItem
                    cartKey={key}
                    key={key}
                    cartItem={cart[key]}
                    removeFromCart={(key) => {
                      rem(key);
                      setSt(!st);
                    }}
                  />
                );
              })}
              <div className="column is-12 is-clearfix">
                <br />
                <div className="is-pulled-right">
                  <button
                    onClick={() => {
                      props.context.clearCart();
                      setSt(!st);
                    }}
                    className="btn btn-danger"
                  >
                    Clear cart
                  </button>{" "}
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      props.context.checkout(history);
                      setSt(!st);
                    }}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="column">
              <div className="title has-text-grey-light">No item in cart!</div>
            </div>
          )}
        </div>
      </div>
      </div>
    </>
  );
};

export default contextWrapper(Cart);
