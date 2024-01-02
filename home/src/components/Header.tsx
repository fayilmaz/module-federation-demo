import React from "react";
import MainNav from "./MainNav";
import Logo from "../../public/assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "shell/ui/Button";
import useShellStore from "shell/useShellStore";
import UserDropDownMenu from "./UserDropDownMenu";

const Header = () => {
  const { userState } = useShellStore();
  const navigate = useNavigate();
  const handleLogout = () => {
    userState.resetLoginData();
    navigate("/");
  };

  const isLoggedIn = userState.loginData?.data?.user?.email;
  return (
    <header className="h-20 bg-red-600 text-white">
      <div className="mx-auto w-3/4">
        <div className="flex h-20 items-center justify-around">
          <div className="flex-1">
            <img src={Logo} width="70px"></img>
          </div>
          <MainNav />
          <div className="flex-1 flex justify-end gap-2">
            <Link key="cart" to="/cart">
              <Button variant="outline" className="text-black">
                Cart
              </Button>
            </Link>
            {isLoggedIn ? (
              <UserDropDownMenu handleLogout={handleLogout} />
            ) : (
              <Link key="login" to="/auth/login">
                <Button variant="outline" className="text-black">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
