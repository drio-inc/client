// import {} from "./types";

import { rootApi } from "@/state/services/apiService";

export const orgApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    addOrgAccount: builder.mutation<any, any>({
      query: (payload) => ({
        url: `/resources/accounts/:accoundId/ous`,
        method: "POST",
        body: payload,
      }),
    }),

    editOrgAccount: builder.mutation<any, any>({
      query: (payload) => ({
        url: `/resources/accounts/:accoundId/ous`,
        method: "PUT",
        body: payload,
      }),
    }),
  }),
});

export const { useAddOrgAccountMutation, useEditOrgAccountMutation } = orgApi;
