import { LoginFormData, LoginRespose, LogoutResponse } from "./types";
import { rootApi } from "@/state/services/apiService";

export const authApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginRespose, LoginFormData>({
      query: (credentials) => ({
        url: `/auth/admin-login`,
        method: "POST",
        body: credentials,
      }),
    }),

    logout: builder.mutation<LogoutResponse, void>({
      query: (credentials) => ({
        url: `/auth/logout`,
        method: "POST",
        body: credentials,
      }),
    }),

    resetPassword: builder.mutation<ApiResponse<any>, any>({
      query: (credentials) => ({
        url: `/reset-password`,
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useResetPasswordMutation } =
  authApi;
