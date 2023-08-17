import {} from "./types";
import { rootApi } from "@/state/services/apiService";

export const metadataApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    addMetadata: builder.mutation<any, any>({
      query: (payload) => ({
        url: `/resources/accounts/:accountId/dataset/:datasetId/metadata`,
        method: "POST",
        body: payload,
      }),
    }),

    editMetadata: builder.mutation<any, any>({
      query: (payload) => ({
        url: `/resources/accounts/:accountId/dataset/:datasetId/metadata`,
        method: "PUT",
        body: payload,
      }),
    }),
  }),
});

export const { useAddMetadataMutation, useEditMetadataMutation } = metadataApi;
