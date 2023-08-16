import { LicenseKeyResponse } from "./types";
import { rootApi } from "@/state/services/apiService";

export const ddxApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchLicense: builder.mutation<any, any>({
      query: (credentials) => ({
        url: `/resources/accounts/:accountId/license`,
        method: "POST",
        body: credentials,
      }),
    }),

    updateLicense: builder.mutation<any, any>({
      query: (credentials) => ({
        url: `/resources/accounts/:accountId/license`,
        method: "PUT",
        body: credentials,
      }),
    }),

    generateDDXKey: builder.mutation<any, any>({
      query: () => ({
        url: `/resources/accounts/:accountId/ddx/generate-key`,
        method: "GET",
      }),
    }),

    provisionDDX: builder.mutation<any, any>({
      query: (credentials) => ({
        url: `/resources/accounts/:accountId/ddx/provision`,
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const {
  useFetchLicenseMutation,
  useProvisionDDXMutation,
  useUpdateLicenseMutation,
  useGenerateDDXKeyMutation,
} = ddxApi;
