import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import ProductProvider from "./context/products";
import { CartProvider } from "./context/cart";
import { UserProvider } from "./context/user";

ReactDOM.render(
  <UserProvider>
    <ProductProvider>
      <CartProvider>
        <Router>
          <App />
        </Router>
      </CartProvider>
    </ProductProvider>
  </UserProvider>,
  document.getElementById("root")
);
