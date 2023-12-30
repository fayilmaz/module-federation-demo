import React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./index.scss";
import Home from "./components/Home";
const App = () => {
  return (
    <Router>
      <div className="text-xl px- mx-auto max-w-full">
        <Home />
      </div>
    </Router>
  );
};
ReactDOM.createRoot(document.getElementById("app")).render(<App />);
