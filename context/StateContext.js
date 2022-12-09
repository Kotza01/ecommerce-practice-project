import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [itemCart, setItemCart] = useState([]);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const incQty = () => {
    setQty((quantity) => quantity + 1);
  };
  const decQty = () => {
    setQty((prevQuantity) =>
      prevQuantity === 1 ? prevQuantity : prevQuantity - 1
    );
  };

  const onAdd = (product, quantity) => {
    const checkCartProduct = itemCart.find((item) => item._id === product._id);

    setTotalPrice((prevPrice) => prevPrice + product.price * quantity);

    setTotalQuantities((prevQuantities) => prevQuantities + quantity);
    if (checkCartProduct) {
      const newItemCart = () => {
        return itemCart.map((item) => {
          if (item._id === product._id) {
            return { ...item, quantity: quantity + item.quantity };
          } else {
            return item;
          }
        });
      };
      setItemCart(newItemCart);
    } else {
      setItemCart([...itemCart, { ...product, quantity }]);
    }
    toast.success(`${qty} ${product.name} added to the cart.`);
    setQty(1);
  };

  const toggleCartITemQuantitiy = (item, value) => {
    if (value === "dec") {
      if (item.quantity > 1) {
        let newItemCart = itemCart.map((product) =>
          product._id === item._id
            ? { ...product, quantity: product.quantity - 1 }
            : product
        );
        setItemCart(newItemCart);
        setTotalPrice(totalPrice - item.price);
        setTotalQuantities(totalQuantities - 1);
      }
    } else if (value === "inc") {
      let newItemCart = itemCart.map((product) =>
        product._id === item._id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      );
      setItemCart(newItemCart);
      setTotalPrice(totalPrice + item.price);
      setTotalQuantities(totalQuantities + 1);
    }
  };

  const onRemove = (item) => {
    const newItemCart = itemCart.filter((product) => product._id !== item._id);
    setItemCart(newItemCart);
    setTotalPrice(totalPrice - item.price * item.quantity);
    setTotalQuantities(totalQuantities - item.quantity);
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        itemCart,
        setItemCart,

        totalPrice,
        setTotalPrice,
        totalQuantities,
        setTotalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        onRemove,
        toggleCartITemQuantitiy,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
