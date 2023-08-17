import {} from "./types";
import { rootApi } from "@/state/services/apiService";

export const datasetsApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    publishDataset: builder.mutation<any, any>({
      query: (payload) => ({
        url: `/resources/accounts/:accountId/dataset`,
        method: "POST",
        body: payload,
      }),
    }),

    updateDataset: builder.mutation<any, any>({
      query: (payload) => ({
        url: `/resources/accounts/:accountId/dataset`,
        method: "PUT",
        body: payload,
      }),
    }),
  }),
});

export const { useUpdateDatasetMutation, usePublishDatasetMutation } =
  datasetsApi;
