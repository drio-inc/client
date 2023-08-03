import { LoginFormData, LoginRespose, LogoutResponse } from "./types";
import { rootApi } from "@/state/services/apiService";

export const authApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    activate: builder.mutation<ApiResponse<any>, any>({
      query: (credentials) => ({
        url: `/activate`,
        method: "POST",
        body: credentials,
      }),
    }),

    login: builder.mutation<ApiResponse<any>, any>({
      query: (credentials) => ({
        url: `/login`,
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

    setPassword: builder.mutation<ApiResponse<any>, any>({
      query: (credentials) => ({
        url: `/auth/set-password`,
        method: "POST",
        body: credentials,
      }),
    }),

    setLDAP: builder.mutation<ApiResponse<any>, any>({
      query: (credentials) => ({
        url: `/auth/ldap`,
        method: "POST",
        body: credentials,
      }),
    }),

    setGoogleAuth: builder.mutation<ApiResponse<any>, any>({
      query: (credentials) => ({
        url: `/auth/google-auth`,
        method: "POST",
        body: credentials,
      }),
    }),

    setOAuth: builder.mutation<ApiResponse<any>, any>({
      query: (credentials) => ({
        url: `/auth/oauth`,
        method: "POST",
        body: credentials,
      }),
    }),

    resetPassword: builder.mutation<ApiResponse<any>, any>({
      query: (credentials) => ({
        url: `/auth/reset-password`,
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useActivateMutation,
  useSetPasswordMutation,
  useResetPasswordMutation,

  useSetLDAPMutation,
  useSetOAuthMutation,
  useSetGoogleAuthMutation,
} = authApi;
