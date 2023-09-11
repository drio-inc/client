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

    generateDDXToken: builder.mutation<
      DDXClusterResponse,
      {
        ou_id: string;
        account_id: string;
        cluster_id: string;
      }
    >({
      query: ({ account_id, ou_id, cluster_id }) => ({
        url: `/resources/accounts/${account_id}/ous/${ou_id}/ddx-clusters/${cluster_id}/token`,
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

    getDDXInstances: builder.query<
      DDXInstanceResponse,
      {
        account_id: string;
        ou_id: string;
        cluster_id: string;
      }
    >({
      query: (payload) => ({
        url: `/resources/accounts/${payload.account_id}/ous/${payload.ou_id}/ddx-clusters/${payload.cluster_id}/ddx-instances`,
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
      invalidatesTags: [
        "Account",
        "DDX_Clusters",
        "DDX_Instances",
        "Organization_Units",
      ],
    }),

    patchDDXCluster: builder.mutation<
      DDXClusterResponse,
      DDXClusterFormData & {
        account_id: string;
        ou_id: string;
        cluster_id: string;
      }
    >({
      query: (payload) => ({
        url: `/resources/accounts/${payload.account_id}/ous/${payload.ou_id}/ddx-clusters/${payload.cluster_id}`,
        method: "PATCH",
        body: {
          ...payload,
          ou_id: undefined,
          account_id: undefined,
          cluster_id: undefined,
        },
      }),
      invalidatesTags: [
        "Account",
        "DDX_Clusters",
        "DDX_Instances",
        "Organization_Units",
      ],
    }),

    updateDDXCluster: builder.mutation<
      DDXClusterResponse,
      DDXClusterFormData & {
        account_id: string;
        ou_id: string;
        cluster_id: string;
      }
    >({
      query: (payload) => ({
        url: `/resources/accounts/${payload.account_id}/ous/${payload.ou_id}/ddx-clusters/${payload.cluster_id}`,
        method: "PUT",
        body: {
          ...payload,
          ou_id: undefined,
          account_id: undefined,
          cluster_id: undefined,
        },
      }),
      invalidatesTags: [
        "Account",
        "DDX_Clusters",
        "DDX_Instances",
        "Organization_Units",
      ],
    }),

    deleteDDXCluster: builder.mutation<
      DDXClusterResponse,
      {
        account_id: string;
        ou_id: string;
        cluster_id: string;
      }
    >({
      query: (payload) => ({
        url: `/resources/accounts/${payload.account_id}/ous/${payload.ou_id}/ddx-clusters/${payload.cluster_id}`,
        method: "DELETE",
      }),
      invalidatesTags: [
        "Account",
        "DDX_Clusters",
        "DDX_Instances",
        "Organization_Units",
      ],
    }),
  }),
});

export const {
  useGetDDXClustersQuery,
  useFetchLicenseMutation,
  useGetDDXInstancesQuery,
  useUpdateLicenseMutation,
  usePatchDDXClusterMutation,
  useGenerateDDXTokenMutation,
  useCreateDDXClusterMutation,
  useUpdateDDXClusterMutation,
  useDeleteDDXClusterMutation,
} = ddxApi;
