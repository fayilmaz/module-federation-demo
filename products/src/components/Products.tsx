import React, { useEffect, useState } from "react";

import useShellStore from "shell/useShellStore";
import Shell from "shell/Shell";
import ErrorBoundary from "../lib/ErrorBoundary";
import { getApi } from "../api";
import { IPokemon } from "../types/pokemon";
import ProductCard from "./ProductCard";

const Products = () => {
  const { count, increment, decrement } = useShellStore();
  const [pokemons, setPokemons] = useState<IPokemon[] | []>([]);
  useEffect(() => {
    getApi("/pokemons").then((res) => {
      if (!res) return;
      setPokemons(res.data.pokemons);
    });
  });
  return (
    <ErrorBoundary>
      <div className="p-2 bg-blue-400">
        <div className="p-2 flex flex-wrap justify-around">
          {pokemons.length > 0 &&
            pokemons.map((p, i) => <ProductCard key={i} pokemon={p} />)}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Products;
