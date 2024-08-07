// import {} from "./types";
import { rootApi } from "@/state/services/apiService";

export const contractRuleApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getContractRules: builder.query<any, void>({
      query: () => ({
        url: "/resources/accounts/:accountId/contract-rule",
        method: "GET",
      }),
    }),

    addContractRule: builder.mutation<any, any>({
      query: (payload) => ({
        url: `/resources/accounts/:accountId/contract-rule`,
        method: "POST",
        body: payload,
      }),
    }),

    updateContractRule: builder.mutation<any, any>({
      query: (payload) => ({
        url: `/resources/accounts/:accountId/contract-rule`,
        method: "PUT",
        body: payload,
      }),
    }),

    addRule: builder.mutation<any, any>({
      query: (payload) => ({
        url: `/resources/accounts/:accountId/contract-rule/rule`,
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  useAddRuleMutation,
  useGetContractRulesQuery,
  useAddContractRuleMutation,
  useUpdateContractRuleMutation,
} = contractRuleApi;
