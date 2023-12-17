import React from "react";
import ReactDOM from "react-dom";

import "./index.scss";
import Checkout from "./components/Checkout";
const App = () => {
  return (
    <div className="mt-10 text-3xl mx-auto max-w-6xl border-2 border-blue-500">
      <Checkout />
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById("app"));
