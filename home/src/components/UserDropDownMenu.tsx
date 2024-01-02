import React from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "shell/ui/NavigationMenu";
import { Button } from "shell/ui/Button";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";

interface IProps {
  handleLogout: () => void;
}

const UserDropDownMenu = (props: IProps) => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="h-10 text-black">
            <FaUser />
            <span className="ml-2">User</span>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className=" p-2 bg-white">
              <Link to="/">
                <NavigationMenuLink>
                  <Button
                    variant="outline"
                    className="border-2 bg-gray-100 hover:bg-white"
                    onClick={props.handleLogout}
                  >
                    Logout
                  </Button>
                </NavigationMenuLink>
              </Link>
              <Link to="/cart">
                <NavigationMenuLink>
                  <Button
                    variant="outline"
                    className="border-2  bg-gray-100 hover:bg-white mt-2"
                  >
                    Cart
                  </Button>
                </NavigationMenuLink>
              </Link>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default UserDropDownMenu;
