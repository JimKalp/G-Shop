import React, { useState, useEffect } from "react";
import ProductService from "../services/productService";
import contextWrapper from "../context/contextWrapper";
import { useParams } from "react-router-dom";
import axios from "axios";

const EditProduct = (props) => {
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState();
  const [saved, setSaved] = useState(false);
  const [product, setProd] = useState();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/products/${id}`);
      setProd(res.data);
      setPrice(res.data.price);
      setDescription(res.data.description);
      setCategory(res.data.category);
      setFile(res.data.img?.url);
    };
    fetchData();
  }, [setProd, setPrice, setDescription, setCategory, id]);

  return (
    <div>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const res = await ProductService.update({
            id: product.id,
            _id: product._id,
            price,
            description,
            category,
            file,
          });
          let prods = props.context.products.slice();
          let index = prods.findIndex((p) => p._id === product._id);
          prods[index] = res.data;
          props.context.setProducts(prods);
          setSaved(true);
        }}
      >
        <div>
          <label>Price:</label>
          <input
            type="text"
            value={price}
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
            value={description}
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
            value={category}
            name="category"
            onChange={(event) => {
              setCategory(event.target.value);
            }}
          />
        </div>
        <div>
          <input type="submit" value="Add product" />
        </div>
      </form>
      {saved && <p className="alert alert-success">Product Saved</p>}
    </div>
  );
};

export default contextWrapper(EditProduct);
