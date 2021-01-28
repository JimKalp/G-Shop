import React, { useState, useEffect, useMemo } from "react";
import Product from "./Product";

const ProductList = ({ products, location }) => {
  const [_products, setProducts] = useState([]);
  const _filter = location?.state?.filter;
  let p = useMemo(() => {
    if (_filter) {
      return products.filter((product) =>
        product.description.search(_filter) >= 0 ? true : false
      );
    } else {
      return products;
    }
  }, [products, _filter]);

  useEffect(() => {
    setProducts(p);
  }, [setProducts, p]);

  return (
    <div className="row">
      {_products.map((product) => {
        return <Product key={product._id} product={product} />;
      })}
    </div>
  );
};

export default ProductList;
