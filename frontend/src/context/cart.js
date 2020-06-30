// cart context
import React, { useState, useEffect } from "react";
//import localCart from "../utils/localCart";

function getCartFromLocal() {
  return localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
}

const CartContext = React.createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState(getCartFromLocal());
  const [total, setTotal] = useState(0);
  const [cartItems, setCartItems] = useState(0);

  useEffect(() => {
    //local storge
    localStorage.setItem("cart", JSON.stringify(cart));

    //set and uppdate cart items quantity
    let newCartItems = cart.reduce((acc, curr) => {
      return (acc += curr.amount);
    }, 0);
    setCartItems(newCartItems);

    //set and uppdate cart total
    let newTotal = cart.reduce((acc, curr) => {
      return (acc += curr.amount * curr.price);
    }, 0);
    newTotal = parseFloat(newTotal).toFixed(2);
    setTotal(newTotal);
  }, [cart]);

  const removeItem = (id) => {
    const items = cart.filter((item) => item.id !== id);
    setCart(items);
  };

  const increaseAmount = (id) => {
    const items = cart.map((item) => {
      return item.id === id
        ? { ...item, amount: item.amount + 1 }
        : { ...item };
    });
    setCart(items);
  };

  //when amount is 0 , item will be removed
  const decreaseAmount = (id, amount) => {
    if (amount === 1) {
      removeItem(id);
      return;
    } else {
      const items = cart.map((item) => {
        return item.id === id
          ? { ...item, amount: item.amount - 1 }
          : { ...item };
      });
      setCart(items);
    }
  };

  const addToCart = (product) => {
    const {
      id,
      image,
      title,
      price,
    } = product;
    const newItem = [...cart].find((item) => item.id === id);
    if (newItem) {
      increaseAmount(id);
      return;
    } else {
      const addItem = { id, image, title, price, amount: 1 };
      setCart([...cart, addItem]);
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        total,
        cartItems,
        removeItem,
        increaseAmount,
        decreaseAmount,
        addToCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export { CartContext, CartProvider };
