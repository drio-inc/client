import { LicenseKeyResponse } from "./types";
import { rootApi } from "@/state/services/apiService";

export const ddxApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    createLicense: builder.mutation<ApiResponse<any>, any>({
      query: (credentials) => ({
        url: `/resources/accounts/:accountId/license`,
        method: "POST",
        body: credentials,
      }),
    }),

    updateLicense: builder.mutation<ApiResponse<any>, any>({
      query: (credentials) => ({
        url: `/resources/accounts/:accountId/license`,
        method: "PUT",
        body: credentials,
      }),
    }),

    fetchLicense: builder.mutation<ApiResponse<any>, any>({
      query: (credentials) => ({
        url: `/resources/accounts/:accountId/license/fetch`,
        method: "POST",
        body: credentials,
      }),
    }),

    getLicenseKey: builder.query<LicenseKeyResponse, any>({
      query: () => ({
        url: `/resources/accounts/:accountId/license/generate-key`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetLicenseKeyQuery,
  useFetchLicenseMutation,
  useCreateLicenseMutation,
  useUpdateLicenseMutation,
} = ddxApi;
