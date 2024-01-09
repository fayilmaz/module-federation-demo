import React from "react";
import { IPokemon } from "../../types/pokemon";
import DisplayPrice from "./DisplayPrice";
import AddToCartButton from "./AddToCartButton";
import { SetCountWithBadge } from "./SetCountWithBadge";
import { cn } from "../../lib/utils";
import useShellStore from "shell/useShellStore";
import { useToast } from "shell/ui/Toast/useToast";

interface IProps {
  pokemon: IPokemon | null;
}

const ProductCard = ({ pokemon }: IProps) => {
  const { toast } = useToast();

  const {
    cartState,
    userState: { userInformations },
  } = useShellStore();

  const handleAddToCart = (newAdded: boolean = false, quantity: number = 1) => {
    const payload = {
      userEmail: userInformations.email,
      pokemonId: pokemon?.id,
      quantity,
    };
    cartState
      .addToCart(payload)
      .then((res) => {
        // TODO: implement backend message for success
        toast({
          description: "successfully added to cart",
          variant: "success",
        });
        if (newAdded) cartState.getCart(userInformations.email);
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: error?.message,
          variant: "destructive",
        });
      });
  };

  const handleRemoveWithQuantity = (quantity: number = 1) => {
    const payload = {
      userEmail: userInformations.email,
      pokemonId: pokemon?.id,
      quantity,
    };
    try {
      cartState.removeWithQuantity(payload).then((res) => {
        // TODO: implement backend message for success
        toast({
          description: "successfully removed from cart",
          variant: "success",
        });
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error?.message,
        variant: "destructive",
      });
    }
  };

  let inCartCount = cartState.cartItems?.find((item: any) => {
    return item.pokemonId == pokemon?.id;
  })?.quantity;

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
              src={`http://localhost:4005/images/${pokemon.image}`}
              alt={`${pokemon.name}-image`}
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
              <div className="mr-2 text-lg font-semibold text-gray-900 dark:text-white">
                <DisplayPrice price={pokemon.price} />
              </div>
              <div
                className={cn(
                  "ml-auto text-base font-medium text-green-500",
                  !inCartCount && "h-16 flex items-center"
                )}
              >
                {!!inCartCount ? (
                  <SetCountWithBadge
                    inCartCount={inCartCount}
                    handleAddToCart={handleAddToCart}
                    handleRemoveWithQuantity={handleRemoveWithQuantity}
                  />
                ) : (
                  <AddToCartButton handleAddToCart={handleAddToCart} />
                )}
              </div>
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
