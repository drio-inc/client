import { LicenseKeyResponse } from "./types";
import { rootApi } from "@/state/services/apiService";

export const ddxApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchLicense: builder.mutation<any, any>({
      query: (payload) => ({
        url: `/resources/accounts/:accountId/license`,
        method: "POST",
        body: payload,
      }),
    }),

    updateLicense: builder.mutation<any, any>({
      query: (payload) => ({
        url: `/resources/accounts/:accountId/license`,
        method: "PUT",
        body: payload,
      }),
    }),

    generateDDXKey: builder.mutation<any, any>({
      query: () => ({
        url: `/resources/accounts/:accountId/ddx/generate-key`,
        method: "GET",
      }),
    }),

    provisionDDX: builder.mutation<any, any>({
      query: (payload) => ({
        url: `/resources/accounts/:accountId/ddx/provision`,
        method: "POST",
        body: payload,
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
