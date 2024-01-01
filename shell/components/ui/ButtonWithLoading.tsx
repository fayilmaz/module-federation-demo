import * as React from "react";
import { Button, ButtonProps } from "./Button";
import { ReloadIcon } from "@radix-ui/react-icons";

interface ButtonWithLoadingProps extends ButtonProps {
  loading: boolean;
}

const ButtonWithLoading = React.forwardRef<
  HTMLButtonElement,
  ButtonWithLoadingProps
>(({ loading, children, ...props }, ref) => {
  return (
    <Button ref={ref} disabled={loading} {...props}>
      {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
});

ButtonWithLoading.displayName = "ButtonWithLoading";

export { ButtonWithLoading };
