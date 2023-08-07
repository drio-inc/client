import { LicenseKeyResponse } from "./types";
import { rootApi } from "@/state/services/apiService";

export const ddxApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    createLicense: builder.mutation<ApiResponse<any>, any>({
      query: (credentials) => ({
        url: `/license/create-license`,
        method: "POST",
        body: credentials,
      }),
    }),

    updateLicense: builder.mutation<ApiResponse<any>, any>({
      query: (credentials) => ({
        url: `/license/update-license`,
        method: "POST",
        body: credentials,
      }),
    }),

    fetchLicense: builder.mutation<ApiResponse<any>, any>({
      query: (credentials) => ({
        url: `/license/fetch-license`,
        method: "POST",
        body: credentials,
      }),
    }),

    getLicenseKey: builder.query<LicenseKeyResponse, any>({
      query: () => ({
        url: `/license/create-key`,
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
