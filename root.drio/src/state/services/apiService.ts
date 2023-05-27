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
    baseUrl: `https://a14c37a0-5c64-4c14-ace9-784f0afc6ac8.mock.pstmn.io/api/v1`,
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

      editOrgAccount: builder.mutation<APIResponse, FormData>({
        query: (credentials) => ({
          url: `/edit-org`,
          method: "POST",
          body: credentials,
        }),
      }),

      addOrgAccountGoogle: builder.mutation<APIResponse, FormData>({
        query: (credentials) => ({
          url: `/add-org/google`,
          method: "POST",
          body: credentials,
        }),
      }),

      addOrgAccountOAuth: builder.mutation<APIResponse, FormData>({
        query: (credentials) => ({
          url: `/add-org/oauth`,
          method: "POST",
          body: credentials,
        }),
      }),

      addOrgAccountLDAP: builder.mutation<APIResponse, FormData>({
        query: (credentials) => ({
          url: `/add-org/ldap`,
          method: "POST",
          body: credentials,
        }),
      }),

      fetchDDXLicense: builder.mutation<APIResponse, FormData>({
        query: (credentials) => ({
          url: `/ddx/fetch-license`,
          method: "POST",
          body: credentials,
        }),
      }),

      updateDDXLicense: builder.mutation<APIResponse, FormData>({
        query: (credentials) => ({
          url: `/ddx/update-license`,
          method: "POST",
          body: credentials,
        }),
      }),

      generateDDXKey: builder.mutation<any, any>({
        query: () => ({
          url: `/ddx/generate-key`,
          method: "GET",
        }),
      }),

      provisionDDX: builder.mutation<APIResponse, FormData>({
        query: (credentials) => ({
          url: `/ddx/provision`,
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
  useSetGoogleAuthMutation,
  useResetPasswordMutation,
  useEditOrgAccountMutation,
  useAddOrgAccountLDAPMutation,
  useAddOrgAccountOAuthMutation,
  useAddOrgAccountGoogleMutation,
  useUpdateDDXLicenseMutation,
  useFetchDDXLicenseMutation,
  useGenerateDDXKeyMutation,
  useProvisionDDXMutation,
} = rootApi;
