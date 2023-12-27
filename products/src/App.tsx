import React from "react";
import * as ReactDOM from "react-dom/client";

import "./index.scss";
import Products from "./components/Products";
const App = () => {
  return (
    <div className="mt-10 text-3xl mx-auto max-w-6xl border-2 border-blue-500">
      <Products />
    </div>
  );
};
ReactDOM.createRoot(document.getElementById("app")).render(<App />);
