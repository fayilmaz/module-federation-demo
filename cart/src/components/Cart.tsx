import React from "react";

import Shell from "shell/Shell";
import useShellStore from "shell/useShellStore";
import { Button } from "shell/ui/Button";
import "tailwindcss/tailwind.css";

const Cart = () => {
  const { count, increment, decrement } = useShellStore();

  return (
    <Shell>
      <div className="p-2">
        <div className="border-2 border-red-500 p-2">
          <div>App: cart</div>
          <div>Port: 3003</div>
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
        </div>
      </div>
    </Shell>
  );
};

export default Cart;
