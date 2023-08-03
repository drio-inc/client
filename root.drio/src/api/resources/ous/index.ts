// import {} from "./types";

import { rootApi } from "@/state/services/apiService";

export const orgApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    addOrgAccount: builder.mutation<ApiResponse<any>, any>({
      query: (credentials) => ({
        url: `/resources/add-org`,
        method: "POST",
        body: credentials,
      }),
    }),

    editOrgAccount: builder.mutation<ApiResponse<any>, any>({
      query: (credentials) => ({
        url: `/resources/edit-org`,
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useAddOrgAccountMutation, useEditOrgAccountMutation } = orgApi;
