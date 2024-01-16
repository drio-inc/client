import { rootApi } from "@/state/services/apiService";
import { Dataset, DatasetSchema, SchemaStats } from "./types";

export const datasetsApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getDatasets: builder.query<
      Dataset,
      DefaultParams & { datasource_id: string }
    >({
      query: ({ account_id, ou_id, datasource_id }) => ({
        url: `/resources/accounts/${account_id}/ous/${ou_id}/data-sources/${datasource_id}/datasets`,
        method: "GET",
      }),
    }),

    getSchemas: builder.query<
      DatasetSchema,
      DefaultParams & { datasource_id: string }
    >({
      query: ({ account_id, ou_id, datasource_id }) => ({
        url: `/resources/accounts/${account_id}/ous/${ou_id}/data-sources/${datasource_id}/schemas`,
        method: "GET",
      }),
    }),

    getSchemaStats: builder.query<
      SchemaStats[],
      DefaultParams & { datasource_id: string }
    >({
      query: ({ account_id, ou_id, datasource_id }) => ({
        url: `/resources/accounts/${account_id}/ous/${ou_id}/data-sources/${datasource_id}/stats`,
        method: "GET",
      }),
    }),

    createDataset: builder.mutation<
      Dataset,
      Dataset & { ddxcluster_id: string; token: string }
    >({
      query: ({ token, ddxcluster_id, ...payload }) => {
        return {
          url: `/resources/ddx-clusters/${ddxcluster_id}/datasets`,
          method: "PUT",
          body: payload,
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        };
      },
    }),

    createSchemas: builder.mutation<
      DatasetSchema,
      DatasetSchema & { ddxcluster_id: string }
    >({
      query: ({ ddxcluster_id, ...payload }) => ({
        url: `/resources/ddx-clusters/${ddxcluster_id}/schemas`,
        method: "PUT",
        body: payload,
      }),
    }),

    createStats: builder.mutation<
      SchemaStats,
      SchemaStats & { ddxcluster_id: string }
    >({
      query: ({ ddxcluster_id, ...payload }) => ({
        url: `/resources/ddx-clusters/${ddxcluster_id}/stats`,
        method: "PUT",
        body: payload,
      }),
    }),
  }),
});

export const { useGetDatasetsQuery, useCreateDatasetMutation } = datasetsApi;
