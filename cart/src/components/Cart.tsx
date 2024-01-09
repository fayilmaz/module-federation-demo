import React, { useEffect } from "react";

import Shell from "shell/Shell";
import useShellStore from "shell/useShellStore";
import { Button } from "shell/ui/Button";
import "tailwindcss/tailwind.css";
import ErrorBoundary from "../lib/ErrorBoundary";
import { useToast } from "shell/ui/Toast/useToast";
import { AxiosError } from "axios";

const Cart = () => {
  const { toast } = useToast();
  const { cartState, userState } = useShellStore();

  useEffect(() => {
    const userEmail = userState.userInformations.email;
    if (userEmail) {
      cartState
        .getCart(userEmail)
        .then((res: any) => res)
        .catch((err: AxiosError) => {
          if (err?.message) {
            toast({
              title: "Error",
              description: err.message,
              variant: "destructive",
            });
          }
        });
    }
  }, []);

  return (
    <Shell>
      <ErrorBoundary>
        <div className="p-2">
          {cartState?.getCartData?.data?.cartItems && (
            <div>
              <div>
                <div>
                  {cartState.getCartData.data.cartItems.map(
                    (item: any, index: number) => (
                      <div key={index}>
                        <p>Pokemon: {item.name}</p>
                        <p>Price: {item.price}</p>
                        <p>Quantity: {item.quantity}</p>
                      </div>
                    )
                  )}
                  <p>Cart Total: {cartState.getCartData.data.cartTotal}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </ErrorBoundary>
    </Shell>
  );
};

export default Cart;
