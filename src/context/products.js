// products context
import React, { useState, useEffect } from "react";
import axios from "axios";
import url from "../utils/URL";
import { featuredProducts, flattenProducts } from "../utils/helpers";

export const ProductContext = React.createContext();

const ProductProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const { data } = await axios.get(`${url}/products`);
      const featured = featuredProducts(flattenProducts(data));
      const products = flattenProducts(data);
      setFeatured(featured);
      setProducts(products);
      setLoading(false);
    };
    getData();
  }, []);

  return (
    <ProductContext.Provider value={{ loading, products, featured }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
