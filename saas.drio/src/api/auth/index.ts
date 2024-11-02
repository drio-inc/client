import { LoginFormData, LoginRespose, LogoutResponse } from "./types";
import { rootApi } from "@/state/services/apiService";

export const authApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    oAuthLogin: builder.query<LoginRespose, void>({
      query: () => ({
        url: `/oauth/admin-login`,
        method: "GET",
        headers: {
          "Content-Type": "text/html; charset=utf-8",
        },
      }),
    }),

    login: builder.mutation<LoginRespose, LoginFormData>({
      query: (payload) => ({
        url: `/auth/admin-login`,
        method: "POST",
        body: payload,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    logout: builder.mutation<LogoutResponse, void>({
      query: (payload) => ({
        url: `/auth/logout`,
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
  useLazyOAuthLoginQuery,
  useResetPasswordMutation,
} = authApi;
