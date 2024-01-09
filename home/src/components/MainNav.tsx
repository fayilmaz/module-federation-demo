import React from "react";
import { NavLink } from "react-router-dom";
import { cn } from "../lib/utils";

const MainNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const navItemsBaseClassName =
    "text-m font-medium text-muted-foreground transition-colors hover:underline";

  const navItems = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/pokemons",
      label: "Pokemons",
    },
    {
      href: "/checkout",
      label: "Checkout",
    },
  ];

  return (
    <nav className={cn("", className)} {...props}>
      <div className="px-2 flex-3 flex gap-4">
        {navItems.map((item, i) => {
          return (
            <NavLink
              key={item.label}
              to={item.href}
              className={({ isActive }) => {
                return isActive
                  ? cn(navItemsBaseClassName, "text-yellow-300")
                  : cn(navItemsBaseClassName, "text-white");
              }}
            >
              {item.label}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default MainNav;
