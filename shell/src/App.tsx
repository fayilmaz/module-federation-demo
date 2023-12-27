import React, { JSXElementConstructor, ReactNode } from "react";
import * as ReactDOM from "react-dom/client";

import "./index.scss";
import useShellStore from "./store/shellStore";
import { getApi, postApi } from "./api";

export const App = ({ children }) => {
  const { count, increment, decrement } = useShellStore();
  if (children) {
    return (
      <div className="text-3xl mx-auto max-w-6xl border-2 border-red-500">
        {children}
      </div>
    );
  } else {
    return (
      <div className="text-center mt-10">
        <div>Shell App</div>
        <div>No children given</div>
      </div>
    );
  }
};
ReactDOM.createRoot(document.getElementById("app")).render(<App />);
