import React from "react";

import useShellStore from "shell/useShellStore";
import Login from "auth/Login";
import Cart from "cart/Cart";
import Checkout from "checkout/Checkout";
import Products from "products/Products";
import { Button } from "shell/ui/Button";
import Shell from "shell/Shell";
import Nav from "./MainNav";
import Header from "./Header";
import { Routes, Route } from "react-router-dom";
import ErrorBoundary from "../lib/ErrorBoundary";

const Home = () => {
  const { count, increment, decrement } = useShellStore();

  return (
    <Shell>
      <ErrorBoundary>
        <Header />
        <Routes>
          <Route path="/" element="home page" />
          <Route path="checkout" element="checkout page" />
          <Route path="cart" element="cart page" />
          <Route path="pokemons" element="pokemons page" />
          <Route path="auth/login" element="login page" />
          <Route path="*" element="fallback path" />
        </Routes>
        <Products />
      </ErrorBoundary>
    </Shell>
  );
};

export default Home;
