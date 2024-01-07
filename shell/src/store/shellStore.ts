import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createPokemonsSlice } from "./pokemonsState";
import { createUserSlice } from "./userState";
import { createCartSlice } from "./cartState";

type ShellStore = {
  count: number;
  increment: () => void;
  decrement: () => void;
  ui: UIState;
  setTheme: (theme: ThemeOptions) => void;
};

type ThemeOptions = "dark" | "light";

type UIState = {
  theme: ThemeOptions;
};

const useShellStore = create<
  ShellStore &
    ReturnType<typeof createPokemonsSlice> &
    ReturnType<typeof createUserSlice> &
    ReturnType<typeof createCartSlice>
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
      ...createPokemonsSlice(set, get, store),
      ...createUserSlice(set, get, store),
      ...createCartSlice(set, get, store),
    })),
    {
      name: "ShellStore",
    }
  )
);

export default useShellStore;
