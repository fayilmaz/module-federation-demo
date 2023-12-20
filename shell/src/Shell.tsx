import React from "react";
import { App } from "./App";

type ShellProps = {
  children: React.FC;
};

const Shell = ({ children }: ShellProps) => {
  return <App>{children}</App>;
};

export default Shell;
