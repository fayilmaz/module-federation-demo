import React from "react";

import useShellStore from "shell/useShellStore";
import Login from "auth/Login";
import Cart from "cart/Cart";
import Checkout from "checkout/Checkout";
import Products from "products/Products";

const Home = () => {
  const { count, increment, decrement } = useShellStore();

  return (
    <div className="border-2 border-blue-500">
      <div>Name: Home</div>
      <div>Port: 3001</div>
      <div>Count {count}</div>
      <div
        className="border-1 border-black rounded-xl  bg-green-400 p-1 w-44 text-center cursor-pointer"
        onClick={() => increment()}
      >
        Increment
      </div>
      <div
        className="border-1 border-black rounded-xl  bg-red-400 p-1 w-44 text-center cursor-pointer"
        onClick={() => decrement()}
      >
        Decrement
      </div>
      <div></div>
      <Login />
      <Cart />
      <Checkout />
      <Products />
    </div>
  );
};

export default Home;
