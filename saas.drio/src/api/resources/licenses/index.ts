import { LicenseKeyResponse } from "./types";
import { rootApi } from "@/state/services/apiService";

export const ddxApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    createLicense: builder.mutation<any, any>({
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

    fetchLicense: builder.mutation<any, any>({
      query: (payload) => ({
        url: `/resources/accounts/:accountId/license/fetch`,
        method: "POST",
        body: payload,
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
