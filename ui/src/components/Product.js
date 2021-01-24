import React from "react";

const Product = ({ product }) => {
  const arrayBufferToBase64 = (buffer) => {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  };
  const data = arrayBufferToBase64(product.img?.data?.data);
  const p = `data:image/jpg;base64,${data}`;
  return (
    <div className="card-body card-container" style={{ display: "grid" }}>
      <img src={p} alt="" style={{ width: "200px", height: "200px" }} />
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
