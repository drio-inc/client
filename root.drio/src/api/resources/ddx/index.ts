import { LicenseKeyResponse } from "./types";
import { rootApi } from "@/state/services/apiService";

export const ddxApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchLicense: builder.mutation<ApiResponse<any>, any>({
      query: (credentials) => ({
        url: `/license/fetch-license`,
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

    generateDDXKey: builder.mutation<any, any>({
      query: () => ({
        url: `/ddx/generate-key`,
        method: "GET",
      }),
    }),

    provisionDDX: builder.mutation<ApiResponse<any>, any>({
      query: (credentials) => ({
        url: `/ddx/provision`,
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
