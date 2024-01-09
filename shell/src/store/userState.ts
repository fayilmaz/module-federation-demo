import { AxiosError } from "axios";
import { postApi } from "../api";
import { IUser, ImmerStateCreator } from "./types";

type loginPayload = {
  email: string;
  password: string;
};

export type UserState = {
  userState: {
    loginData: {
      data: { user: IUser[]; access_token: string } | Record<string, never>;
      announcements: { code: string; message: string }[] | [];
      fetching: boolean;
      success: boolean | null;
      error: { code: string | null | undefined; message: string } | null;
    };
    userInformations: {
      email: string | null;
      name: string | null;
      surname: string | null;
      cartId: string | null;
      access_token: string | null;
    };
    resetUserState: () => void;
    login: (payload: loginPayload) => void;
    resetLoginData: () => void;
    setUserInformations: (userData: any) => void;
  };
};

export const createUserSlice: ImmerStateCreator<UserState> = (
  set,
  get,
  store
) => ({
  userState: {
    loginData: {
      data: {},
      announcements: [],
      fetching: false,
      success: false,
      error: null,
    },
    userInformations: {
      email: null,
      name: null,
      surname: null,
      cartId: null,
      access_token: null,
    },
    resetUserState: () => {
      set((state) => {
        state.userState.loginData = {
          data: {},
          announcements: [],
          fetching: false,
          success: false,
          error: null,
        };
        state.userState.userInformations = {
          email: null,
          name: null,
          surname: null,
          cartId: null,
          access_token: null,
        };
      });
    },
    login: async (payload) => {
      try {
        set((state) => {
          state.userState.loginData.fetching = true;
        });

        const loginRes = await postApi("/auth/login", payload);
        if (loginRes?.data?.user) {
          localStorage.setItem("jwtToken", loginRes.data.access_token);
          set((state) => {
            state.userState.loginData = {
              ...state.userState.loginData,
              data: loginRes.data,
              announcements: [],
              success: true,
              error: null,
            };
            state.userState.userInformations = {
              ...state.userState.userInformations,
              email: loginRes.data.user.email,
            };
          });
        }
        return loginRes;
      } catch (err: AxiosError | any) {
        set((state) => {
          state.userState.loginData = {
            ...state.userState.loginData,
            data: {},
            announcements: [],
            success: false,
            error: { code: err?.name, message: err?.message },
          };
        });
        throw err;
      } finally {
        set((state) => {
          state.userState.loginData.fetching = false;
        });
      }
    },
    resetLoginData: () => {
      set((state) => {
        state.userState.loginData = {
          data: {},
          announcements: [],
          fetching: false,
          success: false,
          error: null,
        };
      });
    },
    setUserInformations: (userData: any) => {
      set((state) => {
        state.userState.userInformations = {
          ...state.userState.userInformations,
          ...userData,
        };
      });
    },
  },
});
