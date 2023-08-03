import {} from "./types";
import { rootApi } from "@/state/services/apiService";

export const metadataApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    addMetadata: builder.mutation<ApiResponse<any>, any>({
      query: (credentials) => ({
        url: `/dataset/${credentials.id}/metadata`,
        method: "POST",
        body: credentials,
      }),
    }),

    editMetadata: builder.mutation<any, any>({
      query: (credentials) => ({
        url: `/dataset/${credentials.id}/metadata`,
        method: "PATCH",
        body: credentials,
      }),
    }),
  }),
});

export const { useAddMetadataMutation, useEditMetadataMutation } = metadataApi;
