import { LoginFormData, LoginRespose, LogoutResponse } from "./types";
import { rootApi } from "@/state/services/apiService";

export const authApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    activate: builder.mutation<any, any>({
      query: (payload) => ({
        url: `/auth/activate`,
        method: "POST",
        body: payload,
      }),
    }),

    login: builder.mutation<any, any>({
      query: (payload) => ({
        url: `/auth/login`,
        method: "POST",
        body: payload,
      }),
    }),

    logout: builder.mutation<LogoutResponse, void>({
      query: (payload) => ({
        url: `/auth/logout`,
        method: "POST",
        body: payload,
      }),
    }),

    setPassword: builder.mutation<any, any>({
      query: (payload) => ({
        url: `/auth/set-password`,
        method: "POST",
        body: payload,
      }),
    }),

    setLDAP: builder.mutation<any, any>({
      query: (payload) => ({
        url: `/auth/ldap`,
        method: "POST",
        body: payload,
      }),
    }),

    setGoogleAuth: builder.mutation<any, any>({
      query: (payload) => ({
        url: `/auth/google-auth`,
        method: "POST",
        body: payload,
      }),
    }),

    setOAuth: builder.mutation<any, any>({
      query: (payload) => ({
        url: `/auth/oauth`,
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
  useActivateMutation,
  useSetPasswordMutation,
  useResetPasswordMutation,

  useSetLDAPMutation,
  useSetOAuthMutation,
  useSetGoogleAuthMutation,
} = authApi;
