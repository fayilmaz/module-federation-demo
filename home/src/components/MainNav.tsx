import React from "react";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";

const MainNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const menuItems = [
    {
      href: "/",
      className: "text-m font-medium transition-colors hover:text-primary",
      label: "Home",
    },
    {
      href: "/products",
      className:
        "text-m font-medium text-muted-foreground transition-colors hover:text-primary",
      label: "Products",
    },
    {
      href: "/Cart",
      className:
        "text-m font-medium text-muted-foreground transition-colors hover:text-primary",
      label: "Cart",
    },
    {
      href: "/auth",
      className:
        "text-m font-medium text-muted-foreground transition-colors hover:text-primary",
      label: "Login",
    },
    {
      href: "/checkout",
      className:
        "text-m font-medium text-muted-foreground transition-colors hover:text-primary",
      label: "Checkout",
    },
  ];

  return (
    <nav
      className={cn(
        "flex items-center justify-center space-x-4 lg:space-x-6 w-full",
        className
      )}
      {...props}
    >
      {menuItems.map((item) => {
        return (
          <Link to={item.href} className={item.className}>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};

export default MainNav;
