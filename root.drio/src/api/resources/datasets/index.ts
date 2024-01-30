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
      SchemaStats,
      DefaultParams & { datasource_id: string }
    >({
      query: ({ account_id, ou_id, datasource_id }) => ({
        url: `/resources/accounts/${account_id}/ous/${ou_id}/data-sources/${datasource_id}/stats`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetDatasetsQuery, useGetSchemaStatsQuery } = datasetsApi;
