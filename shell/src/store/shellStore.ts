import { create } from "zustand";

type ShellStore = {
  count: number;
  increment: () => void;
  decrement: () => void;
};

const useShellStore = create<ShellStore>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));

export default useShellStore;
