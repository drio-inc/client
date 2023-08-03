import {} from "./types";
import { rootApi } from "@/state/services/apiService";

export const datasetsApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    publishDataset: builder.mutation<ApiResponse<any>, any>({
      query: (credentials) => ({
        url: `/dataset/publish`,
        method: "POST",
        body: credentials,
      }),
    }),

    updateDataset: builder.mutation<any, any>({
      query: (credentials) => ({
        url: `/dataset/update`,
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useUpdateDatasetMutation, usePublishDatasetMutation } =
  datasetsApi;
