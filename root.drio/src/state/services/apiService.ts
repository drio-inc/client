import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const MOCK_URL =
  "https://a14c37a0-5c64-4c14-ace9-784f0afc6ac8.mock.pstmn.io/api/v1";

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

type DataSourceAPIResponse = {
  id: string;
  sourceName: string;
  type: string;
  endpoint: string;
  datasets: number;
  schemaRegistry: string;
  metadataManagement: string;
  apiDocumentation: string;
};

export const rootApi = createApi({
  reducerPath: "rootApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `/api`,
    credentials: "include",
    prepareHeaders: (headers) => {
      return headers;
    },
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

      setPassword: builder.mutation<APIResponse, FormData>({
        query: (credentials) => ({
          url: `/set-password`,
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

      addDataSource: builder.mutation<DataSourceAPIResponse, FormData>({
        query: (credentials) => ({
          url: `/data-source/add`,
          method: "POST",
          body: credentials,
        }),
      }),

      publishDataset: builder.mutation<APIResponse, FormData>({
        query: (credentials) => ({
          url: `/dataset/publish`,
          method: "POST",
          body: credentials,
        }),
      }),

      updateDataset: builder.mutation<APIResponse, FormData>({
        query: (credentials) => ({
          url: `/dataset/update`,
          method: "POST",
          body: credentials,
        }),
      }),

      editDataSource: builder.mutation<APIResponse, FormData>({
        query: (credentials) => ({
          url: `/data-source/update`,
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
  useAddOrgAccountMutation,
  useUpdateLicenseMutation,
  useFetchLicenseMutation,
  useGenerateDDXKeyMutation,
  useProvisionDDXMutation,
  useAddDataSourceMutation,
  usePublishDatasetMutation,
  useEditDataSourceMutation,
  useUpdateDatasetMutation,
  useSetPasswordMutation,
} = rootApi;
