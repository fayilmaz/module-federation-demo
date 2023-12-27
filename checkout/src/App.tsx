import React from "react";
import * as ReactDOM from "react-dom/client";

import "./index.scss";
import Checkout from "./components/Checkout";
const App = () => {
  return (
    <div className="mt-10 text-3xl mx-auto max-w-6xl border-2 border-blue-500">
      <Checkout />
    </div>
  );
};
ReactDOM.createRoot(document.getElementById("app")).render(<App />);
