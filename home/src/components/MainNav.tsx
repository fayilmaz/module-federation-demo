import React from "react";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";

const MainNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const navItems = [
    {
      href: "/",
      className: "text-m font-medium transition-colors hover:text-yellow-400",
      label: "Home",
    },
    {
      href: "/pokemons",
      className:
        "text-m font-medium text-muted-foreground transition-colors hover:text-white",
      label: "Pokemons",
    },
    {
      href: "/checkout",
      className:
        "text-m font-medium text-muted-foreground transition-colors hover:text-white",
      label: "Checkout",
    },
  ];

  return (
    <nav className={cn("", className)} {...props}>
      <div className="px-2 flex-3 flex gap-4">
        {navItems.map((item, i) => {
          return (
            <Link
              key={item.label}
              to={item.href}
              className={cn(item.className, "")}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MainNav;
