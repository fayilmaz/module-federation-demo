import React from "react";
import PokemonDollar from "../svg/PokemonDollar";
type DisplayPriceProps = {
  price: string | null;
};

const DisplayPrice = (props: DisplayPriceProps) => {
  const formattedPrice = props.price ? props.price : "0.00";
  return (
    <div>
      <span>
        <PokemonDollar />
      </span>
      <span>{formattedPrice}</span>
    </div>
  );
};

export default DisplayPrice;
