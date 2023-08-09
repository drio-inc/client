import {} from "./types";
import { rootApi } from "@/state/services/apiService";

export const datasetsApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    publishDataset: builder.mutation<ApiResponse<any>, any>({
      query: (credentials) => ({
        url: `/resources/accounts/:accountId/dataset`,
        method: "POST",
        body: credentials,
      }),
    }),

    updateDataset: builder.mutation<any, any>({
      query: (credentials) => ({
        url: `/resources/accounts/:accountId/dataset`,
        method: "PUT",
        body: credentials,
      }),
    }),
  }),
});

export const { useUpdateDatasetMutation, usePublishDatasetMutation } =
  datasetsApi;
