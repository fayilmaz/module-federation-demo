import { AxiosError } from "axios";
import { getApi } from "../api";
import { IPokemon, ImmerStateCreator } from "./types";

export type PokemonsState = {
  pokemonsState: {
    getPokemonsData: {
      data: { pokemons: IPokemon[] } | Record<string, never>;
      announcements: { code: string; message: string }[] | [];
      fetching: boolean;
      success: boolean | null;
      error: { message: string } | null;
    };
    resetPokemonsState: () => void;
    getPokemons: () => void;
  };
};

export const createPokemonsSlice: ImmerStateCreator<PokemonsState> = (
  set,
  get,
  store
) => ({
  pokemonsState: {
    getPokemonsData: {
      data: {},
      announcements: [],
      fetching: false,
      success: false,
      error: null,
    },
    resetPokemonsState: () => {
      set((state) => {
        state.pokemonsState.getPokemonsData = {
          data: {},
          announcements: [],
          fetching: false,
          success: false,
          error: null,
        };
      });
    },
    getPokemons: async () => {
      try {
        set((state) => {
          state.pokemonsState.getPokemonsData.fetching = true;
        });

        const pokemonsRes = await getApi("/pokemons");
        if (pokemonsRes?.data?.pokemons) {
          set((state) => {
            state.pokemonsState.getPokemonsData = {
              ...state.pokemonsState.getPokemonsData,
              data: pokemonsRes?.data,
              announcements: pokemonsRes?.announcementList,
              success: true,
              error: null,
            };
          });
          return pokemonsRes;
        }
      } catch (err: AxiosError | any) {
        set((state) => {
          set((state) => {
            state.pokemonsState.getPokemonsData = {
              data: {},
              announcements: [],
              fetching: false,
              success: false,
              error: null,
            };
          });
        });
        throw err;
      } finally {
        set((state) => {
          state.pokemonsState.getPokemonsData.fetching = false;
        });
      }
    },
  },
});
