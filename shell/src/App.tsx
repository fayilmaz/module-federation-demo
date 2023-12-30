import React, { JSXElementConstructor, ReactNode } from "react";
import * as ReactDOM from "react-dom/client";

import "./index.scss";
import useShellStore from "./store/shellStore";
import { getApi, postApi } from "./api";

interface IProps {
  children: React.FunctionComponent | Record<string, never> | null;
}

export const App = ({ children }: IProps) => {
  const { count, increment, decrement } = useShellStore();
  if (children) {
    return <div>{children}</div>;
  } else {
    return (
      <div className="text-center mt-10">
        <div>Shell App</div>
        <div>No children given</div>
      </div>
    );
  }
};
ReactDOM.createRoot(document.getElementById("app")).render(
  <App children={null} />
);
