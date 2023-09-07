import {
  DDXClusterFormData,
  DDXClusterResponse,
  DDXInstanceFormData,
  DDXInstanceResponse,
} from "./types";
import { rootApi } from "@/state/services/apiService";

export const ddxApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchLicense: builder.mutation<any, any>({
      query: (payload) => ({
        url: `/resources/accounts/:accountId/license`,
        method: "POST",
        body: payload,
      }),
    }),

    updateLicense: builder.mutation<any, any>({
      query: (payload) => ({
        url: `/resources/accounts/:accountId/license`,
        method: "PUT",
        body: payload,
      }),
    }),

    generateDDXKey: builder.mutation<any, any>({
      query: () => ({
        url: `/resources/accounts/:accountId/ddx/generate-key`,
        method: "GET",
      }),
    }),

    getDDXClusters: builder.query<
      DDXClusterResponse,
      {
        ou_id: string;
        account_id: string;
      }
    >({
      query: (payload) => ({
        url: `/resources/accounts/${payload.account_id}/ous/${payload.ou_id}/ddx-clusters`,
        method: "GET",
      }),
    }),

    createDDXCluster: builder.mutation<
      DDXClusterResponse,
      DDXClusterFormData & { account_id: string; ou_id: string }
    >({
      query: (payload) => ({
        url: `/resources/accounts/${payload.account_id}/ous/${payload.ou_id}/ddx-clusters`,
        method: "POST",
        body: {
          ...payload,
          ou_id: undefined,
          account_id: undefined,
        },
      }),
    }),

    provisionDDX: builder.mutation<
      DDXInstanceResponse,
      DDXInstanceFormData & {
        ou_id: string;
        account_id: string;
        cluster_id: string;
      }
    >({
      query: (payload) => ({
        url: `/resources/accounts/${payload.account_id}/ous/${payload.ou_id}/ddx-clusters/${payload.cluster_id}/ddx-instances`,
        method: "POST",
        body: {
          ...payload,
          ou_id: undefined,
          account_id: undefined,
          cluster_id: undefined,
        },
      }),
    }),
  }),
});

export const {
  useGetDDXClustersQuery,
  useFetchLicenseMutation,
  useProvisionDDXMutation,
  useUpdateLicenseMutation,
  useGenerateDDXKeyMutation,
  useCreateDDXClusterMutation,
} = ddxApi;
