import React from "react";
import { Button } from "shell/ui/Button";

const AddToCartButton = () => {
  return (
    <Button
      variant="destructive"
      onClick={() => console.log("clicked add to cart")}
    >
      Add
    </Button>
  );
};

export default AddToCartButton;
