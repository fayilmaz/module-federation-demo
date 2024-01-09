import React, { useEffect, useState } from "react";

import useShellStore from "shell/useShellStore";
import ErrorBoundary from "../lib/ErrorBoundary";
import { IPokemon } from "../types/pokemon";
import ProductCard from "./ProductCard";
import { AxiosResponse } from "axios";
import { useToast } from "shell/ui/Toast/useToast";

const Products = () => {
  const { count, increment, decrement, pokemonsState } = useShellStore();
  const { toast } = useToast();

  useEffect(() => {
    pokemonsState
      .getPokemons()
      .then((res: AxiosResponse) => res)
      .catch((err) => {
        toast({
          title: "Error",
          description: err.message,
          variant: "destructive",
        });
      });
  }, []);
  return (
    <ErrorBoundary>
      <div className="w-full pt-8 bg-blue-400">
        <div className="mx-auto w-3/4">
          <div className="flex flex-wrap justify-between">
            {pokemonsState.getPokemonsData.fetching ? (
              <p className="text-red-400 text-2xl mx-auto py-20">LOADING...</p>
            ) : pokemonsState?.getPokemonsData.data?.pokemons?.length > 0 ? (
              pokemonsState?.getPokemonsData.data?.pokemons.map(
                (p: IPokemon, i: number) => <ProductCard key={i} pokemon={p} />
              )
            ) : null}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Products;
