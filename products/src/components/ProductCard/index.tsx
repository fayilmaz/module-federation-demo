import React from "react";
import { IPokemon } from "../../types/pokemon";
import DisplayPrice from "./DisplayPrice";
import AddToCartButton from "./AddToCartButton";
import { SetCountWithBadge } from "./SetCountWithBadge";
import { cn } from "../../lib/utils";

interface IProps {
  pokemon: IPokemon | null;
  inCartCount?: number | null;
}

const ProductCard = ({ pokemon, inCartCount = 0 }: IProps) => {
  if (pokemon?.id === 25) {
    inCartCount = 2;
  }
  return (
    <div className="rounded mb-8 shadow-md">
      {pokemon ? (
        <div className="mx-auto w-80 transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md hover:scale-150 hover:shadow-lg">
          <div
            onClick={() => console.warn("handle click pokemon card")}
            className="cursor-pointer"
          >
            <img
              className="h-48 w-full object-cover object-center p-5 cursor-pointer"
              src="https://picsum.photos/500/300"
              alt={`${pokemon.name} image`}
            />
            <div className="px-4 pt-4 cursor-pointer">
              <h2 className="mb-2 text-lg font-medium dark:text-white text-gray-900">
                {pokemon.name}
              </h2>
              <p className="text-base dark:text-gray-300 text-gray-700 line-clamp-2">
                {pokemon.description}
              </p>
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-center">
              <p className="mr-2 text-lg font-semibold text-gray-900 dark:text-white">
                <DisplayPrice price="100.00" />
              </p>
              <p
                className={cn(
                  "ml-auto text-base font-medium text-green-500",
                  !inCartCount && "h-16 flex items-center"
                )}
              >
                {!!inCartCount ? (
                  <SetCountWithBadge inCartCount={inCartCount} />
                ) : (
                  <AddToCartButton />
                )}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div>No pokemon exist</div>
      )}
    </div>
  );
};

export default ProductCard;
