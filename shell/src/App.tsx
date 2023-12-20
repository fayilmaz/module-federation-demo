import React from "react";
import ReactDOM from "react-dom";

import "./index.scss";
import useShellStore from "./store/shellStore";

export const App = ({ children }) => {
  const { count, increment, decrement } = useShellStore();
  if (children) {
    return (
      <div className="mt-10 text-3xl mx-auto max-w-6xl border-2 border-red-500">
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

ReactDOM.render(<App />, document.getElementById("app"));
