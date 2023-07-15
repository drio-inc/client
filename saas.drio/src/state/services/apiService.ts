import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type FormData = {};

type APIResponse = {
  id: string;
  role: string;
  email: string;
  userName: string;
  otherUserInfo: string;
  someSessionIdentifier: string;
};

type LicenseKeyResponse = {
  licenseKey: string;
};

export const rootApi = createApi({
  reducerPath: "rootApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `/api`,
    credentials: "include",
  }),
  endpoints: (builder) => {
    return {
      login: builder.mutation<any, any>({
        query: (credentials) => ({
          url: `/auth/admin-login`,
          method: "POST",
          body: credentials,
        }),
      }),

      logout: builder.mutation<any, any>({
        query: (credentials) => ({
          url: `/auth/logout`,
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

      editOrgAccount: builder.mutation<APIResponse, FormData>({
        query: (credentials) => ({
          url: `/edit-org`,
          method: "POST",
          body: credentials,
        }),
      }),

      addOrgAccount: builder.mutation<APIResponse, FormData>({
        query: (credentials) => ({
          url: `/add-org/add`,
          method: "POST",
          body: credentials,
        }),
      }),

      fetchLicense: builder.mutation<APIResponse, FormData>({
        query: (credentials) => ({
          url: `/license/fetch-license`,
          method: "POST",
          body: credentials,
        }),
      }),

      updateLicense: builder.mutation<APIResponse, FormData>({
        query: (credentials) => ({
          url: `/license/update-license`,
          method: "POST",
          body: credentials,
        }),
      }),

      createLicense: builder.mutation<APIResponse, FormData>({
        query: (credentials) => ({
          url: `/license/create-license`,
          method: "POST",
          body: credentials,
        }),
      }),

      // createLicenseKey: builder.mutation<LicenseKeyResponse, FormData>({
      //   query: () => ({
      //     url: `/license/create-key`,
      //     method: "GET",
      //   }),
      // }),

      getLicenseKey: builder.query<LicenseKeyResponse, FormData>({
        query: () => ({
          url: `/license/create-key`,
          method: "GET",
        }),
      }),
    };
  },
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useSetLDAPMutation,
  useSetOAuthMutation,
  useAddAccountMutation,
  useEditAccountMutation,
  useResetPasswordMutation,
  useSetGoogleAuthMutation,
  useEditOrgAccountMutation,
  useAddOrgAccountMutation,
  useUpdateLicenseMutation,
  useFetchLicenseMutation,
  useCreateLicenseMutation,
  // useCreateLicenseKeyMutation,
  useGetLicenseKeyQuery,
} = rootApi;
