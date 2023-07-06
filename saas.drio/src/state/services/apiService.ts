import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = "https://controller.drio.ai:8443/drioapi/v1";
const MOCK_URL =
  "https://779f508a-ad6b-4ed1-a232-dc0f458ca58c.mock.pstmn.io/api/v1";

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
    baseUrl: `${MOCK_URL}`,
    credentials: "include",
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  endpoints: (builder) => {
    return {
      login: builder.mutation<any, any>({
        query: (credentials) => ({
          url: `/login`,
          method: "POST",
          body: credentials,
        }),

        // async onQueryStarted({ requestId }, { dispatch, queryFulfilled }) {
        //   const response = await queryFulfilled;
        //   const setCookieHeader = response;
        //   if (setCookieHeader) {
        //     console.log("Set-Cookie:", setCookieHeader);
        //   }
        // },

        // transformResponse(baseQueryReturnValue, meta, arg) {
        //   console.log("meta", meta?.response?.headers.get("Set-Cookie"));
        //   return baseQueryReturnValue;
        // },
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
  useSetLDAPMutation,
  useSetOAuthMutation,
  useAddAccountMutation,
  useEditAccountMutation,
  useResetPasswordMutation,
  useSetGoogleAuthMutation,
  useEditOrgAccountMutation,
  useAddOrgAccountGoogleMutation,
  useAddOrgAccountOAuthMutation,
  useAddOrgAccountLDAPMutation,
  useUpdateLicenseMutation,
  useFetchLicenseMutation,
  useCreateLicenseMutation,
  // useCreateLicenseKeyMutation,
  useGetLicenseKeyQuery,
} = rootApi;
