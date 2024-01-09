import React, { useEffect } from "react";
import * as ReactDOM from "react-dom/client";

import "./index.scss";
import useShellStore from "./store/shellStore";
import { getApi, postApi } from "./api";
import { jwtDecode } from "jwt-decode";

interface IProps {
  children: React.FunctionComponent | Record<string, never> | null;
}

export const App = ({ children }: IProps) => {
  const { userState, cartState } = useShellStore();
  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");
    if (jwtToken) {
      try {
        const decodedToken: { user: { id: string } } = jwtDecode(jwtToken);
        if (decodedToken && decodedToken?.user?.id) {
          userState.setUserInformations({
            email: decodedToken.user.id,
            access_token: jwtToken,
          });
          cartState.getCart(decodedToken.user.id);
        }
      } catch (error) {
        console.log("jwt decode error", error);
      }
    }
  }, []);
  if (children) {
    return <div className="flex flex-col min-h-screen">{children}</div>;
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
