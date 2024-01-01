import React from "react";

import useShellStore from "shell/useShellStore";

import "tailwindcss/tailwind.css";
import ErrorBoundary from "../lib/ErrorBoundary";
import LoginForm from "./LoginForm";
import { goTo } from "../lib/utils";

const Login = () => {
  const { login } = useShellStore();
  const handleLogin = (formValues: { email: string; password: string }) => {
    login(formValues).then((res) => {
      if (res && res.success) {
        goTo("/pokemons");
      }
    });
  };

  return (
    <ErrorBoundary>
      <div className="w-full flex grow overflow-y-auto pt-8 bg-blue-400">
        <div className="mx-auto justify-center flex flex-col">
          <div className="h-auto bg-white p-5 rounded-2xl lg:min-w-[400px] md:min-w-[400px]">
            <h3 className="mx-auto text-center">Login Form</h3>
            <div className="w-50 pt-5">
              <LoginForm handleLogin={handleLogin} />
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Login;
