import React from "react";
import ReactDOM from "react-dom";

import "./index.scss";
import Products from "./components/Products";
const App = () => {
  return (
    <div className="mt-10 text-3xl mx-auto max-w-6xl border-2 border-blue-500">
      <Products />
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById("app"));
