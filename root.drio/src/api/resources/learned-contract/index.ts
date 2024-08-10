import {} from "./types";
import { rootApi } from "@/state/services/apiService";

export const learnedContractApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    addLearnedContract: builder.mutation<any, any>({
      query: (payload) => ({
        url: `/resources/accounts/:accountId/dataset/:datasetId/learned-contract`,
        method: "POST",
        body: payload,
      }),
    }),

    editLearnedContract: builder.mutation<any, any>({
      query: (payload) => ({
        url: `/resources/accounts/:accountId/dataset/:datasetId/learned-contract`,
        method: "PUT",
        body: payload,
      }),
    }),
  }),
});

export const { useAddLearnedContractMutation, useEditLearnedContractMutation } = learnedContractApi;
