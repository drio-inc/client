import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type FormData = {};

type APIResponse = {
  id: string;
  role: string;
  email: string;
  userName: string;
  otherUserInfo: string;
  someSessionIdentifier: string;
  authMode?: "ldap" | "google" | "oauth" | "";
};

export const rootApi = createApi({
  reducerPath: "rootApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://779f508a-ad6b-4ed1-a232-dc0f458ca58c.mock.pstmn.io/api/v1`,
  }),
  endpoints: (builder) => {
    return {
      activate: builder.mutation<APIResponse, FormData>({
        query: (credentials) => ({
          url: `/activate`,
          method: "POST",
          body: credentials,
        }),
      }),

      login: builder.mutation<APIResponse, FormData>({
        query: (credentials) => ({
          url: `/login`,
          method: "POST",
          body: credentials,
        }),
      }),

      setLDAP: builder.mutation<APIResponse, FormData>({
        query: (credentials) => ({
          url: `/ldap`,
          method: "POST",
          body: credentials,
        }),
      }),

      setGoogleAuth: builder.mutation<APIResponse, FormData>({
        query: (credentials) => ({
          url: `/google-auth`,
          method: "POST",
          body: credentials,
        }),
      }),

      setOAuth: builder.mutation<APIResponse, FormData>({
        query: (credentials) => ({
          url: `/oauth`,
          method: "POST",
          body: credentials,
        }),
      }),

      resetPassword: builder.mutation<APIResponse, FormData>({
        query: (credentials) => ({
          url: `/reset-password`,
          method: "POST",
          body: credentials,
        }),
      }),

      addAccount: builder.mutation<APIResponse, FormData>({
        query: (credentials) => ({
          url: `/saas/add-account`,
          method: "POST",
          body: credentials,
        }),
      }),

      editAccount: builder.mutation<APIResponse, FormData>({
        query: (credentials) => ({
          url: `/saas/edit-account`,
          method: "POST",
          body: credentials,
        }),
      }),
    };
  },
});

export const {
  useLoginMutation,
  useSetLDAPMutation,
  useSetOAuthMutation,
  useActivateMutation,
  useAddAccountMutation,
  useEditAccountMutation,
  useResetPasswordMutation,
  useSetGoogleAuthMutation,
} = rootApi;
