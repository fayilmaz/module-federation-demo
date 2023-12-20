import React from "react";

import useShellStore from "shell/useShellStore";
// import Login from "auth/Login";
// import Cart from "cart/Cart";
// import Checkout from "checkout/Checkout";
import Products from "products/Products";
import { Button } from "shell/ui/Button";
import Shell from "shell/Shell";

const Home = () => {
  const { count, increment, decrement } = useShellStore();

  return (
    <Shell>
      <div className="border-2 border-blue-500">
        <div>Name: Home</div>
        <div>Port: 3001</div>
        <div>Count {count}</div>
        <Button className="block mb-2" onClick={() => increment()}>
          Increment
        </Button>
        <Button
          className="block mb-2"
          variant="destructive"
          onClick={() => decrement()}
        >
          Decrement
        </Button>
        {/* <Login />
      <Cart />
      <Checkout /> */}
        <Products />
      </div>
    </Shell>
  );
};

export default Home;
