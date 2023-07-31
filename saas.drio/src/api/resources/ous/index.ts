// import {} from "./types";

import { rootApi } from "@/state/services/apiService";

export const authApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    addOrgAccount: builder.mutation<ApiResponse<any>, FormData>({
      query: (credentials) => ({
        url: `/add-org`,
        method: "POST",
        body: credentials,
      }),
    }),

    editOrgAccount: builder.mutation<ApiResponse<any>, FormData>({
      query: (credentials) => ({
        url: `/edit-org`,
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useAddOrgAccountMutation, useEditOrgAccountMutation } = authApi;
