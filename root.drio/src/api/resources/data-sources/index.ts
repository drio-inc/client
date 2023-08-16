import {} from "./types";
import { rootApi } from "@/state/services/apiService";

export const dataSourcesApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    addDataSource: builder.mutation<any, any>({
      query: (credentials) => ({
        url: `/resources/accounts/:accountId/data-source`,
        method: "POST",
        body: credentials,
      }),
    }),

    editDataSource: builder.mutation<any, any>({
      query: (credentials) => ({
        url: `/resources/accounts/:accountId/data-source`,
        method: "PUT",
        body: credentials,
      }),
    }),
  }),
});

export const { useAddDataSourceMutation, useEditDataSourceMutation } =
  dataSourcesApi;
