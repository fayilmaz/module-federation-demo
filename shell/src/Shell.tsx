import React from "react";
import { App } from "./App";
import ErrorBoundary from "../lib/ErrorBoundary";
import { Toaster } from "../components/ui/Toast/Toaster";

type ShellProps = {
  children: React.FC;
};

const Shell = ({ children }: ShellProps) => {
  return (
    <App>
      <ErrorBoundary>{children}</ErrorBoundary>
      <Toaster />
    </App>
  );
};

export default Shell;
