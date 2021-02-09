import React, { useState } from "react";
import { UserContext } from "../context/user_context";
import ProductService from "../services/productService";

const AddProduct = () => {
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState();

  return (
    <UserContext.Consumer>
      {(state) => (
        <div>
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              await ProductService.add(price, description, category, file);
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
      )}
    </UserContext.Consumer>
  );
};

export default AddProduct;
