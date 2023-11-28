import { rootApi } from "@/state/services/apiService";
import { MutationResponse, DataSourceParams } from "../types";

export const metadataServerApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getMetadataServers: builder.query<RegistryData[], DefaultParams>({
      query: ({ account_id, ou_id }) => ({
        url: `/resources/accounts/${account_id}/ous/${ou_id}/metadata-servers`,
        method: "GET",
      }),
    }),

    getMetadataServerById: builder.query<
      RegistryData,
      DataSourceParams & { ms_id: string }
    >({
      query: ({ account_id, ou_id, ms_id }) => ({
        url: `/resources/accounts/${account_id}/ous/${ou_id}/metadata-servers/${ms_id}`,
        method: "GET",
      }),
    }),

    createMetadataServer: builder.mutation<
      MutationResponse,
      DataSourceParams & Pick<RegistryData, "name" | "endpoints">
    >({
      query: ({ account_id, ou_id, ...payload }) => ({
        url: `/resources/accounts/${account_id}/ous/${ou_id}/metadata-servers`,
        method: "POST",
        body: payload,
      }),
    }),

    updateMetadataServer: builder.mutation<
      MutationResponse,
      DataSourceParams &
        Pick<RegistryData, "name" | "endpoints"> & { ms_id: string }
    >({
      query: ({ account_id, ou_id, ms_id, ...payload }) => ({
        url: `/resources/accounts/${account_id}/ous/${ou_id}/metadata-servers/${ms_id}`,
        method: "PUT",
        body: payload,
      }),
    }),

    patchMetadataServer: builder.mutation<
      MutationResponse,
      DataSourceParams &
        Pick<RegistryData, "name" | "endpoints"> & { ms_id: string }
    >({
      query: ({ account_id, ou_id, ms_id, ...payload }) => ({
        url: `/resources/accounts/${account_id}/ous/${ou_id}/metadata-servers/${ms_id}`,
        method: "PATCH",
        body: payload,
      }),
    }),

    deleteMetadataServer: builder.mutation<
      MutationResponse,
      DataSourceParams & { ms_id: string }
    >({
      query: ({ account_id, ou_id, ms_id }) => ({
        url: `/resources/accounts/${account_id}/ous/${ou_id}/metadata-servers/${ms_id}`,
        method: "DELETE",
      }),
    }),

    updateMetadataServerSecureFlag: builder.mutation<
      MutationResponse,
      DataSourceParams &
        Pick<RegistryData, "secure" | "insecure_skip_verify"> & {
          ms_id: string;
        }
    >({
      query: ({ ou_id, secure, account_id, ms_id, insecure_skip_verify }) => ({
        url: `/resources/accounts/${account_id}/ous/${ou_id}/metadata-servers/${ms_id}/secure`,
        method: "PUT",
        body: { secure, insecure_skip_verify },
      }),
    }),
  }),
});

export const {
  useGetMetadataServersQuery,
  useGetMetadataServerByIdQuery,
  usePatchMetadataServerMutation,
  useCreateMetadataServerMutation,
  useUpdateMetadataServerMutation,
  useDeleteMetadataServerMutation,
  useUpdateMetadataServerSecureFlagMutation,
} = metadataServerApi;
