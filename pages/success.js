import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";
import { useRouter } from "next/router";
import { useStateContext } from "../context/StateContext";
import { runFireworks } from "../lib/utils";

const success = () => {
  const { setItemCart, setTotalPrice, setTotalQuantities } = useStateContext();

  const [order, setOrder] = useState(null);

  useEffect(() => {
    localStorage.clear();
    setItemCart([]);
    setTotalPrice(0);
    setTotalPrice(0);
    runFireworks();
  }, []);

  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thanks for your order</h2>
        <p className="email-msg"> Check your emain inbox for the receipt</p>
        <p className="description">
          If you have cuestion, please mail
          <a className="email" href="mailto:order@example.com">
            Order@example.com
          </a>
        </p>
        <Link href={"/"}>
          <button type="button" width="300px" className="btn">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default success;
