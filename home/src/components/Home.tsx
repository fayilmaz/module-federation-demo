import React from "react";

import useShellStore from "shell/useShellStore";
import Login from "auth/Login";
import Cart from "cart/Cart";
import Checkout from "checkout/Checkout";
import Products from "products/Products";
import Shell from "shell/Shell";
import Header from "./Header";
import { Routes, Route } from "react-router-dom";
import ErrorBoundary from "../lib/ErrorBoundary";

const Home = () => {
  const { count, increment, decrement } = useShellStore();

  return (
    <Shell>
      <ErrorBoundary>
        <>
          <Header />
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="checkout" element="checkout page" />
            <Route path="cart" element={<Cart />} />
            <Route path="pokemons" element={<Products />} />
            <Route path="auth/login" element={<Login />} />
            <Route path="*" element="fallback path" />
          </Routes>
        </>
      </ErrorBoundary>
    </Shell>
  );
};

export default Home;
