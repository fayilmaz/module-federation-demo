import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createPokemonsSlice } from "./pokemonsState";
import { createUserSlice } from "./userState";

type ShellStore = {
  count: number;
  increment: () => void;
  decrement: () => void;
  ui: UIState;
  setTheme: (theme: ThemeOptions) => void;
  setUser: (user: UserState) => void;
  setProducts: (products: Product[]) => void;
  setCart: (cartItems: CartItem[]) => void;
  addToCart: (cartItems: CartItem[]) => void;
  removeFromCart: (cartItemToBeRemoved: CartItem) => void;
  clearCart: () => void;
  user: UserState;
  products: Product[] | [];
  cart: CartItem[] | [];
};

type ThemeOptions = "dark" | "light";

type UIState = {
  theme: ThemeOptions;
};

type UserState = {
  email: string | null;
  token: string | null;
};

type Product = {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  price: string;
};

type CartItem = {
  id: string;
  count: number;
  product: Product;
};

const useShellStore = create<
  ShellStore &
    ReturnType<typeof createPokemonsSlice> &
    ReturnType<typeof createUserSlice>
>()(
  devtools(
    immer((set, get, store) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 })),
      decrement: () => set((state) => ({ count: state.count - 1 })),
      ui: {
        theme: "dark",
      },
      setTheme: (theme) => set((state) => ({ ui: { theme: theme } })),
      user: { email: null, token: null },
      setUser: (user) => set(() => ({ user: user })),
      products: [],
      setProducts: () => set(() => ({})),
      cart: [],
      setCart: (cart) => set(() => ({ cart: cart })),
      addToCart: (newCartItems) =>
        set((state) => ({ cart: [...state.cart, ...newCartItems] })),
      removeFromCart: (cartItemToBeRemoved) =>
        set((state) => ({
          cart: [
            ...state.cart.filter((item) => item.id !== cartItemToBeRemoved.id),
          ],
        })),
      clearCart: () => set(() => ({ cart: [] })),
      ...createPokemonsSlice(set, get, store),
      ...createUserSlice(set, get, store),
    })),
    {
      name: "ShellStore",
    }
  )
);

export default useShellStore;
