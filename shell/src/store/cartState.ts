import { AxiosError } from "axios";
import { getApi, postApi } from "../api";
import { IUser, ImmerStateCreator } from "./types";
import useSWR from "swr";

export type CartItem = {
  cartId: string;
  pokemonId: string;
  name: string;
  quantity: number;
};

export type CartState = {
  cartState: {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (cartId: string) => void;
    clearCart: () => void;
  };
};

export const createCartSlice: ImmerStateCreator<CartState> = (
  set,
  get,
  store
) => {
  const { data: cartData, error } = useSWR("/user/cart", getApi);

  return {
    cartState: {
      items: [],
      addItem: (item) => {
        set((state) => {
          state.cartState.items.push(item);
        });
      },
      removeItem: (cartId) => {
        set((state) => {
          state.cartState.items = state.cartState.items.filter(
            (item) => item.pokemonId !== cartId
          );
        });
      },
      clearCart: () => {
        set((state) => {
          state.cartState.items = [];
        });
      },
    },
  };
};
