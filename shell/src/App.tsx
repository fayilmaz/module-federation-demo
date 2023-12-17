import React from "react";
import ReactDOM from "react-dom";

import "./index.scss";
import useShellStore from "./store/shellStore.ts";
import Home from "home/Home";

const App = () => {
  const { count, increment, decrement } = useShellStore();

  return (
    <div className="mt-10 text-3xl mx-auto max-w-6xl border-2 border-red-500">
      <div>Name: shell</div>
      <div>Port: 3000</div>
      <div>Count {count}</div>
      <div onClick={increment}>Increment</div>
      <div onClick={decrement}>Decrement</div>
      <div className="border-2 border-red-500">
        <Home />
      </div>
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById("app"));
