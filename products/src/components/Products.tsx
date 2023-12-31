import React, { useEffect, useState } from "react";

import useShellStore from "shell/useShellStore";
import Shell from "shell/Shell";
import ErrorBoundary from "../lib/ErrorBoundary";
import { getApi } from "../api";
import { IPokemon } from "../types/pokemon";
import ProductCard from "./ProductCard";

const Products = () => {
  const { count, increment, decrement, getPokemons, pokemonsState } =
    useShellStore();
  useEffect(() => {
    getPokemons();
  }, []);
  return (
    <ErrorBoundary>
      <div className="w-full pt-8 bg-blue-400">
        <div className="mx-auto w-3/4">
          <div className="flex flex-wrap justify-between">
            {pokemonsState.fetching ? (
              <p className="text-red-400 text-2xl mx-auto py-20">LOADING...</p>
            ) : pokemonsState.data?.pokemons?.length > 0 ? (
              pokemonsState.data?.pokemons.map((p: IPokemon, i: number) => (
                <ProductCard key={i} pokemon={p} />
              ))
            ) : null}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Products;
