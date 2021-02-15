import React, { useState } from "react";
import ProductService from "../services/productService";
import contextWrapper from "../context/contextWrapper";
import { Redirect, useHistory } from "react-router-dom";

const AddProduct = ({ addProducts, context }) => {
  let history = useHistory();
  const isAuthenticated = context.isAuthenticated;
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState();
  const [err, setErr] = useState(false);

  return isAuthenticated ? (
    <div>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          try {
            const res = await ProductService.add(
              price,
              description,
              category,
              file
            );
            console.log(res);
            addProducts(res);
            history.push("/");
          } catch (err) {
            setErr(true);
          }
        }}
      >
        <div>
          <label>Price:</label>
          <input
            type="text"
            name="price"
            onChange={(event) => {
              setPrice(event.target.value);
            }}
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            name="category"
            onChange={(event) => {
              setCategory(event.target.value);
            }}
          />
        </div>
        <div>
          <input
            type="file"
            name="uploaded_file"
            onChange={(event) => setFile(event.target.files[0])}
          />
        </div>
        <div>
          <input type="submit" value="Add product" />
        </div>
      </form>
      {err && <p className="alert alert-danger">Wrong Product Values</p>}
    </div>
  ) : (
    <Redirect to="/login" />
  );
};

export default contextWrapper(AddProduct);
