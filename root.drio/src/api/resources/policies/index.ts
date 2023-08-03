// import {} from "./types";

import { rootApi } from "@/state/services/apiService";

export const policiesApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getPolicies: builder.query<any, void>({
      query: () => ({
        url: "/resources/policies",
        method: "GET",
      }),
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map(({ id }: any) => ({
                type: "Policies" as const,
                id,
              })),
              "Policies",
            ]
          : ["Policies"],
    }),

    addPolicy: builder.mutation<ApiResponse<any>, any>({
      query: (credentials) => ({
        url: `/resources/policies`,
        method: "POST",
        body: credentials,
      }),
    }),

    editPolicy: builder.mutation<ApiResponse<any>, any>({
      query: (credentials) => ({
        url: `/resources/policies`,
        method: "PATCH",
        body: credentials,
      }),
    }),
  }),
});

export const {
  useGetPoliciesQuery,
  useAddPolicyMutation,
  useEditPolicyMutation,
} = policiesApi;
