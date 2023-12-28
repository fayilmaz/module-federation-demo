import React, { useEffect, useState } from "react";

import useShellStore from "shell/useShellStore";
import { Button } from "shell/ui/Button";
import Shell from "shell/Shell";
import ErrorBoundary from "../lib/ErrorBoundary";
import { getApi } from "../api";
import { IPokemon } from "../types/pokemon";
import Product from "./Product";

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
    <Shell>
      <ErrorBoundary>
        <div className="p-2 bg-blue-400">
          <div className="border-2 border-red-500 p-2">
            {pokemons.length > 0 &&
              pokemons.map((p, i) => <Product key={i} pokemon={p} />)}
          </div>
        </div>
      </ErrorBoundary>
    </Shell>
  );
};

export default Products;
