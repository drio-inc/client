import { DataSourceParams, DataSourceFormdata, DataSourceResponse } from "./types";
import { rootApi } from "@/state/services/apiService";

export const dataSourcesApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getDataSources: builder.query<DataSource[], DefaultParams>({
      query: ({ account_id, ou_id }) => ({
        url: `/resources/accounts/${account_id}/ous/${ou_id}/data-sources`,
        method: "GET",
      }),
    }),

    getDataSourceById: builder.query<DataSource, DataSourceParams>({
      query: ({ account_id, ou_id, id }) => ({
        url: `/resources/accounts/${account_id}/ous/${ou_id}/data-sources/${id}`,
        method: "GET",
      }),
    }),

    createDataSource: builder.mutation<DataSourceResponse, DataSourceFormdata & DefaultParams>({
      query: ({ account_id, ou_id, ...payload }) => ({
        url: `/resources/accounts/${account_id}/ous/${ou_id}/data-sources`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Account", "Data_Sources", "Organization_Units"],
    }),

    updateDataSource: builder.mutation<DataSourceResponse, DataSourceFormdata & DataSourceParams>({
      query: ({ account_id, ou_id, id, ...payload }) => ({
        url: `/resources/accounts/${account_id}/ous/${ou_id}/data-sources/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Account", "Data_Sources", "Organization_Units"],
    }),

    patchDataSource: builder.mutation<
      DataSourceResponse,
      Omit<DataSourceFormdata, "secure" | "insecure_skip_verify"> & DataSourceParams
    >({
      query: ({ account_id, ou_id, ...payload }) => ({
        url: `/resources/accounts/${account_id}/ous/${ou_id}/data-sources/${payload.id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Account", "Data_Sources", "Organization_Units"],
    }),

    deleteDataSource: builder.mutation<DataSourceResponse, DataSourceParams>({
      query: ({ account_id, ou_id, id }) => ({
        url: `/resources/accounts/${account_id}/ous/${ou_id}/data-sources/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Account", "Data_Sources", "Organization_Units"],
    }),

    updateSecureFlag: builder.mutation<
      DataSourceResponse,
      DataSourceParams & Pick<RegistryData, "secure" | "insecure_skip_verify">
    >({
      query: ({ id, ou_id, account_id, secure, insecure_skip_verify }) => ({
        url: `/resources/accounts/${account_id}/ous/${ou_id}/data-sources/${id}/secure`,
        method: "PUT",
        body: { secure, insecure_skip_verify },
      }),
    }),
  }),
});

export const {
  useGetDataSourcesQuery,
  useGetDataSourceByIdQuery,
  usePatchDataSourceMutation,
  useCreateDataSourceMutation,
  useUpdateDataSourceMutation,
  useDeleteDataSourceMutation,
  useUpdateSecureFlagMutation,
} = dataSourcesApi;
