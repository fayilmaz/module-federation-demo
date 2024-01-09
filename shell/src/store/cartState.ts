import { AxiosError } from "axios";
import { getApi, patchApi, postApi } from "../api";
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
    localCartItems: [];
    cartItems: CartItem[];
    getCartData: {
      data: { cartItems: [] | any } | Record<string, never>;
      announcements: { code: string; message: string }[] | [];
      fetching: boolean;
      success: boolean | null;
      error: { message: string } | null;
    };
    addToCartData: {
      data: Record<string, never>;
      announcements: { code: string; message: string }[] | [];
      fetching: boolean;
      success: boolean | null;
      error: { message: string } | null;
    };
    removeWithQuantityData: {
      data: Record<string, never>;
      announcements: { code: string; message: string }[] | [];
      fetching: boolean;
      success: boolean | null;
      error: { message: string } | null;
    };
    deleteFromCartData: {
      data: Record<string, never>;
      announcements: { code: string; message: string }[] | [];
      fetching: boolean;
      success: boolean | null;
      error: { message: string } | null;
    };
    resetCartState: () => void;
    getCart: (userId: string) => Promise<any>;
    addToCart: (item: CartItem) => Promise<any>;
    removeWithQuantity: (payload: {
      userEmail: string;
      pokemonId: number;
      quantity: number;
    }) => Promise<any>;
    clearCart: () => void;
  };
};

export const createCartSlice: ImmerStateCreator<CartState> = (
  set,
  get,
  store
) => {
  // const { data: cartData, error } = useSWR("/user/cart", getApi);

  return {
    cartState: {
      localCartItems: [],
      cartItems: [],
      getCartData: {
        data: {},
        announcements: [],
        fetching: false,
        success: false,
        error: null,
      },
      addToCartData: {
        data: {},
        announcements: [],
        fetching: false,
        success: false,
        error: null,
      },
      removeWithQuantityData: {
        data: {},
        announcements: [],
        fetching: false,
        success: false,
        error: null,
      },
      deleteFromCartData: {
        data: {},
        announcements: [],
        fetching: false,
        success: false,
        error: null,
      },
      resetCartState: () => {
        set((state) => {
          state.cartState.localCartItems = [];
          state.cartState.cartItems = [];
          state.cartState.getCartData = {
            data: {},
            announcements: [],
            fetching: false,
            success: false,
            error: null,
          };
          state.cartState.addToCartData = {
            data: {},
            announcements: [],
            fetching: false,
            success: false,
            error: null,
          };
          state.cartState.removeWithQuantityData = {
            data: {},
            announcements: [],
            fetching: false,
            success: false,
            error: null,
          };
          state.cartState.deleteFromCartData = {
            data: {},
            announcements: [],
            fetching: false,
            success: false,
            error: null,
          };
        });
      },
      getCart: async (userId: string) => {
        set((state) => {
          state.cartState.getCartData.fetching = true;
        });
        try {
          const getCartRes = await getApi(`/cart?userId=${userId}`);
          if (getCartRes?.data) {
            set((state) => {
              state.cartState.getCartData = {
                ...state.cartState.getCartData,
                data: getCartRes.data,
                announcements: getCartRes.announcementList,
                success: true,
                error: null,
              };
              state.cartState.cartItems = getCartRes?.data?.cartItems;
            });
          }
          return getCartRes;
        } catch (error: AxiosError | any) {
          set((state) => {
            state.cartState.getCartData = {
              ...state.cartState.getCartData,
              data: {},
              announcements: [],
              success: false,
              error: { message: error?.message },
            };
          });
          throw error;
        } finally {
          set((state) => {
            state.cartState.getCartData.fetching = false;
          });
        }
      },
      addToCart: async (payload) => {
        set((state) => {
          state.cartState.addToCartData.fetching = true;
        });
        try {
          const addToCartRes = await postApi("/cart/add", payload);
          if (addToCartRes?.success) {
            set((state) => {
              const currentItem = state.cartState.cartItems.find(
                (item) => item.pokemonId == payload.pokemonId
              );
              if (currentItem) {
                currentItem.quantity += payload.quantity;
              }
            });
            return addToCartRes;
          }
        } catch (error: AxiosError | any) {
          set((state) => {
            state.cartState.addToCartData = {
              ...state.cartState.addToCartData,
              data: {},
              announcements: [],
              success: false,
              error: { message: error?.message },
            };
          });
          throw error;
        } finally {
          set((state) => {
            state.cartState.addToCartData.fetching = false;
          });
        }
      },
      removeWithQuantity: async (payload) => {
        set((state) => {
          state.cartState.removeWithQuantityData.fetching = true;
        });
        try {
          const removeWithQuantityRes = await patchApi(
            "/cart/removeWithQuantity",
            payload
          );
          if (removeWithQuantityRes?.success) {
          }
          set((state) => {
            const currentItem = state.cartState.cartItems.find(
              (item) => Number(item.pokemonId) == payload.pokemonId
            );
            if (currentItem) {
              // delete pokemon from cartState.cartItems if quantity will be 0 after decrement
              if (currentItem.quantity == 1) {
                state.cartState.cartItems = state.cartState.cartItems.filter(
                  (item) => Number(item.pokemonId) !== payload.pokemonId
                );
              } else {
                currentItem.quantity -= payload.quantity;
              }
            }
          });
          return removeWithQuantityRes;
        } catch (error: AxiosError | any) {
          set((state) => {
            state.cartState.removeWithQuantityData = {
              ...state.cartState.removeWithQuantityData,
              data: {},
              announcements: [],
              success: false,
              error: { message: error?.message },
            };
          });
          throw error;
        } finally {
          set((state) => {
            state.cartState.removeWithQuantityData.fetching = false;
          });
        }
      },
      clearCart: () => {
        set((state) => {
          state.cartState.cartItems = [];
        });
      },
    },
  };
};
