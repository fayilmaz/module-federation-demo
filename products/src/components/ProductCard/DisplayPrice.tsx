import React from "react";
import PokemonDollar from "../svg/PokemonDollar";
type DisplayPriceProps = {
  price: number;
};

const DisplayPrice = (props: DisplayPriceProps) => {
  const formattedPrice = props.price ? props.price : "-";
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
