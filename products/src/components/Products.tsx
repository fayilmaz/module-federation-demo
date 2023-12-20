import React from "react";

import useShellStore from "shell/useShellStore";
import { Button } from "shell/ui/Button";
import Shell from "shell/Shell";

const Products = () => {
  const { count, increment, decrement } = useShellStore();

  return (
    <Shell>
      <div className="p-2">
        <div className="border-2 border-red-500 p-2">
          <div>App: products</div>
          <div>Port: 3005</div>
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

export default Products;
