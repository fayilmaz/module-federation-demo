import React from "react";
import MainNav from "./MainNav";
import Logo from "../../public/assets/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
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
              Cart
            </Link>
            <Link key="login" to="/auth/login">
              Login
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
