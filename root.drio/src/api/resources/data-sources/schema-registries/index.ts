import { rootApi } from "@/state/services/apiService";
import { DataSourceResponse, DataSourceParams } from "../types";

export const schemaRegistrysApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getSchemaRegistries: builder.query<RegistryData[], DefaultParams>({
      query: ({ account_id, ou_id }) => ({
        url: `/resources/accounts/${account_id}/ous/${ou_id}/schema-registries`,
        method: "GET",
      }),
    }),

    getSchemaRegistryById: builder.query<
      RegistryData,
      DataSourceParams & { sr_id: string }
    >({
      query: ({ account_id, ou_id, sr_id }) => ({
        url: `/resources/accounts/${account_id}/ous/${ou_id}/schema-registries/${sr_id}`,
        method: "GET",
      }),
    }),

    createSchemaRegistry: builder.mutation<
      DataSourceResponse,
      DataSourceParams & Pick<RegistryData, "name" | "endpoints">
    >({
      query: ({ account_id, ou_id, ...payload }) => ({
        url: `/resources/accounts/${account_id}/ous/${ou_id}/schema-registries`,
        method: "POST",
        body: payload,
      }),
    }),

    updateSchemaRegistry: builder.mutation<
      DataSourceResponse,
      DataSourceParams &
        Pick<RegistryData, "name" | "endpoints"> & { sr_id: string }
    >({
      query: ({ account_id, ou_id, sr_id, ...payload }) => ({
        url: `/resources/accounts/${account_id}/ous/${ou_id}/schema-registries/${sr_id}`,
        method: "PUT",
        body: payload,
      }),
    }),

    patchSchemaRegistry: builder.mutation<
      DataSourceResponse,
      DataSourceParams &
        Pick<RegistryData, "name" | "endpoints"> & { sr_id: string }
    >({
      query: ({ account_id, ou_id, sr_id, ...payload }) => ({
        url: `/resources/accounts/${account_id}/ous/${ou_id}/schema-registries/${sr_id}`,
        method: "PATCH",
        body: payload,
      }),
    }),

    deleteSchemaRegistry: builder.mutation<
      DataSourceResponse,
      DataSourceParams & { sr_id: string }
    >({
      query: ({ account_id, ou_id, sr_id }) => ({
        url: `/resources/accounts/${account_id}/ous/${ou_id}/schema-registries/${sr_id}`,
        method: "DELETE",
      }),
    }),

    updateSchemaRegistrySecureFlag: builder.mutation<
      DataSourceResponse,
      DataSourceParams &
        Pick<RegistryData, "secure" | "insecure_skip_verify"> & {
          sr_id: string;
        }
    >({
      query: ({ ou_id, secure, account_id, sr_id, insecure_skip_verify }) => ({
        url: `/resources/accounts/${account_id}/ous/${ou_id}/schema-registries/${sr_id}/secure`,
        method: "PUT",
        body: { secure, insecure_skip_verify },
      }),
    }),
  }),
});

export const {} = schemaRegistrysApi;
