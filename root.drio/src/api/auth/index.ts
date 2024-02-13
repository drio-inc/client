import { LoginFormData, LoginResponse, LogoutResponse } from "./types";
import { rootApi } from "@/state/services/apiService";

export const authApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginFormData>({
      query: (payload) => ({
        url: `/auth/login`,
        method: "POST",
        body: payload,
      }),
    }),

    logout: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: `/auth/logout`,
        method: "POST",
      }),
    }),

    setPassword: builder.mutation<any, any>({
      query: (payload) => ({
        url: `/auth/set-password`,
        method: "POST",
        body: payload,
      }),
    }),

    resetPassword: builder.mutation<any, any>({
      query: (payload) => ({
        url: `/auth/reset-password`,
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useSetPasswordMutation,
  useResetPasswordMutation,
} = authApi;
