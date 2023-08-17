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

    addPolicy: builder.mutation<any, any>({
      query: (payload) => ({
        url: `/resources/accounts/:accountId/policies`,
        method: "POST",
        body: payload,
      }),
    }),

    updatePolicy: builder.mutation<any, any>({
      query: (payload) => ({
        url: `/resources/accounts/:accountId/policies`,
        method: "PUT",
        body: payload,
      }),
    }),

    addRule: builder.mutation<any, any>({
      query: (payload) => ({
        url: `/resources/accounts/:accountId/policies/rule`,
        method: "POST",
        body: payload,
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
