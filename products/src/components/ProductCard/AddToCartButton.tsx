import React from "react";
import { Button } from "shell/ui/Button";

interface IProps {
  handleAddToCart: (notInCart?: boolean) => void;
}

const AddToCartButton = (props: IProps) => {
  return (
    <Button
      variant="destructive"
      onClick={() => {
        props.handleAddToCart(true);
      }}
    >
      Add
    </Button>
  );
};

export default AddToCartButton;
