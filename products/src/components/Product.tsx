import React from "react";
import { IPokemon } from "../types/pokemon";

const Product = ({ pokemon }: { pokemon: IPokemon | null }) => {
  return (
    <div className="border-2 border-black rounded">
      {pokemon ? <div>Name: {pokemon.name}</div> : <div>No pokemon exist</div>}
    </div>
  );
};

export default Product;
