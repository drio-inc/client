// import {} from "./types";

import { rootApi } from "@/state/services/apiService";

export const orgApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    addOrgAccount: builder.mutation<ApiResponse<any>, any>({
      query: (credentials) => ({
        url: `/resources/accounts/:accountId/ous`,
        method: "POST",
        body: credentials,
      }),
    }),

    editOrgAccount: builder.mutation<any, any>({
      query: (credentials) => ({
        url: `/resources/accounts/:accountId/ous`,
        method: "PUT",
        body: credentials,
      }),
    }),
  }),
});

export const { useAddOrgAccountMutation, useEditOrgAccountMutation } = orgApi;
