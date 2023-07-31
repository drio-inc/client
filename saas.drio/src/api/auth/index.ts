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

    setLDAP: builder.mutation<ApiResponse<any>, FormData>({
      query: (credentials) => ({
        url: `/ldap`,
        method: "POST",
        body: credentials,
      }),
    }),

    setGoogleAuth: builder.mutation<ApiResponse<any>, FormData>({
      query: (credentials) => ({
        url: `/google-auth`,
        method: "POST",
        body: credentials,
      }),
    }),

    setOAuth: builder.mutation<ApiResponse<any>, FormData>({
      query: (credentials) => ({
        url: `/oauth`,
        method: "POST",
        body: credentials,
      }),
    }),

    resetPassword: builder.mutation<ApiResponse<any>, FormData>({
      query: (credentials) => ({
        url: `/reset-password`,
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useSetLDAPMutation,
  useSetOAuthMutation,
  useSetGoogleAuthMutation,
  useResetPasswordMutation,
} = authApi;
