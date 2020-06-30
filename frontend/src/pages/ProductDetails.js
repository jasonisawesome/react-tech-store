import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { ProductContext } from "./../context/products";
import Loading from "./../components/Loading";
import { CartContext } from "../context/cart";

export default function ProductDetails() {
  //id comes from router is a string here needs to be parsed into int
  const { id } = useParams();
  const history = useHistory();

  const { products } = useContext(ProductContext);
  const product = products.find((item) => item.id === parseInt(id));
  console.log(product);

  //cart context
  const { addToCart } = useContext(CartContext);

  if (products.length === 0) {
    return <Loading />;
  } else {
    const {
      image,
      title,
      price,
      description,
    } = product;
    return (
      <section className="single-product">
        <img src={image} alt={title} className="single-product-image" />
        <article>
          <h1>{title}</h1>
          <h2>${price}</h2>
          <p>{description}</p>
          <button
            className="btn btn-primary btn-block"
            onClick={() => {
              addToCart(product);
              history.push("/cart");
            }}
          >
            add to cart
          </button>
        </article>
      </section>
    );
  }
}
