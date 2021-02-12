import React, { useState } from "react";
import ProductService from "../services/productService";
import { useHistory } from "react-router-dom";

const AddProduct = ({ addProducts }) => {
  let history = useHistory();
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState();

  return (
    <div>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const res = await ProductService.add(
            price,
            description,
            category,
            file
          );
          addProducts(res);
          history.push("/");
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
    </div>
  );
};

export default AddProduct;
