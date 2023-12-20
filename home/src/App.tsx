import React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./index.scss";
import Home from "./components/Home";
const App = () => {
  return (
    <Router>
      <div className="mt-10 text-3xl mx-auto max-w-6xl border-2 border-blue-500">
        <Home />
      </div>
    </Router>
  );
};
ReactDOM.createRoot(document.getElementById("app")).render(<App />);
