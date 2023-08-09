// import {} from "./types";

import { rootApi } from "@/state/services/apiService";

export const policiesApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getPolicies: builder.query<any, void>({
      query: () => ({
        url: "/resources/accounts/:accountId/policies",
        method: "GET",
      }),
      // providesTags: (result, error, arg) =>
      //   result
      //     ? [
      //         ...result.map(({ id }: any) => ({
      //           type: "Policies" as const,
      //           id,
      //         })),
      //         "Policies",
      //       ]
      //     : ["Policies"],
    }),

    addPolicy: builder.mutation<ApiResponse<any>, any>({
      query: (credentials) => ({
        url: `/resources/accounts/:accountId/policies`,
        method: "POST",
        body: credentials,
      }),
    }),

    updatePolicy: builder.mutation<ApiResponse<any>, any>({
      query: (credentials) => ({
        url: `/resources/accounts/:accountId/policies`,
        method: "PUT",
        body: credentials,
      }),
    }),

    addRule: builder.mutation<ApiResponse<any>, any>({
      query: (credentials) => ({
        url: `/resources/accounts/:accountId/policies/rule`,
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const {
  useAddRuleMutation,
  useGetPoliciesQuery,
  useAddPolicyMutation,
  useUpdatePolicyMutation,
} = policiesApi;
