import React, { useState, useEffect } from "react";
import Product from "./Product";

const ProductList = ({ products, location }) => {
  const [_products, setProducts] = useState([]);
  console.log(location, _products);
  const _filter = location?.state?.filter;
  let p = [];
  if (_filter) {
    p = products.filter((product) =>
      product.description.search(_filter) >= 0 ? true : false
    );
  } else {
    p = products;
  }
  useEffect(() => {
    setProducts(p);
  });
  return (
    <div>
      {_products.map((product) => {
        return <Product product={product} />;
      })}
    </div>
  );
};

export default ProductList;
