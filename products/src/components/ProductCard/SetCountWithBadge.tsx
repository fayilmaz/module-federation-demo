import React from "react";
import { Button } from "shell/ui/Button";
import PokeBallSvg from "../svg/PokeBallSvg";

type SetCountWithBadgeProps = {
  inCartCount: number;
  handleAddToCart: (notInCart: boolean) => void;
  handleRemoveWithQuantity: () => void;
};

export const SetCountWithBadge = ({
  inCartCount = 0,
  handleAddToCart,
  handleRemoveWithQuantity,
}: SetCountWithBadgeProps) => {
  return (
    <div className="flex justify-center items-center">
      <Button
        className="bg-blue-400 text-md w-10 h-10"
        onClick={() => handleRemoveWithQuantity()}
      >
        -
      </Button>
      <div className="relative mx-1">
        <div className="t-0 absolute left-3">
          <div className="flex h-2 w-2 items-center justify-center rounded-full border-2 border-white bg-red-500 p-3 text-xs text-white">
            {inCartCount}
          </div>
        </div>
        <PokeBallSvg style={{ maxWidth: "35px" }} />
      </div>
      <Button
        className="bg-red-400 text-md w-10 h-10"
        onClick={() => handleAddToCart(false)}
      >
        +
      </Button>
    </div>
  );
};
