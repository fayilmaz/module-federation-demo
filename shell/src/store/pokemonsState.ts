import { AxiosError } from "axios";
import { getApi } from "../api";
import { IPokemon, ImmerStateCreator } from "./types";

export type PokemonsState = {
  pokemonsState: {
    data: { pokemons: IPokemon[] } | Record<string, never>;
    announcements: { code: string; message: string }[] | [];
    fetching: boolean;
    success: boolean | null;
    error: { message: string } | null;
  };
  getPokemons: () => void;
};

export const createPokemonsSlice: ImmerStateCreator<PokemonsState> = (
  set,
  get,
  store
) => ({
  pokemonsState: {
    data: {},
    announcements: [],
    fetching: false,
    success: false,
    error: null,
  },
  getPokemons: async () => {
    try {
      set((state) => {
        state.pokemonsState.fetching = true;
      });

      const pokemonsRes = await getApi("/pokemons");
      if (pokemonsRes?.data?.pokemons) {
        set((state) => ({
          pokemonsState: {
            data: pokemonsRes?.data,
            announcements: pokemonsRes?.announcementList,
            success: true,
            error: null,
          },
        }));
      }
    } catch (err: AxiosError | any) {
      set((state) => {
        return {
          pokemonsState: {
            data: {},
            announcements: [],
            success: false,
            error: { code: err?.name, message: err?.message },
          },
        };
      });
    } finally {
      set((state) => {
        state.pokemonsState.fetching = false;
      });
    }
  },
});
