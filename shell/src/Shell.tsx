import React from "react";
import { App } from "./App";
import ErrorBoundary from "../lib/ErrorBoundary";

type ShellProps = {
  children: React.FC;
};

const Shell = ({ children }: ShellProps) => {
  return (
    <App>
      <ErrorBoundary>{children}</ErrorBoundary>
    </App>
  );
};

export default Shell;
