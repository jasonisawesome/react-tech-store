import React, { useContext } from "react";
import { ProductContext } from "./../context/products";
import Loading from "./../components/Loading";
import ProductList from "./../components/Products/ProductList";

export default function Products() {
  const context = useContext(ProductContext);
  const { loading, products } = context;
  console.log(products);

  if (loading) {
    return <Loading />;
  }
  return <ProductList title="our products" products={products} />;
}
