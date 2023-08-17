import {} from "./types";
import { rootApi } from "@/state/services/apiService";

export const dataSourcesApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    addDataSource: builder.mutation<any, any>({
      query: (payload) => ({
        url: `/resources/accounts/:accountId/data-source`,
        method: "POST",
        body: payload,
      }),
    }),

    editDataSource: builder.mutation<any, any>({
      query: (payload) => ({
        url: `/resources/accounts/:accountId/data-source`,
        method: "PUT",
        body: payload,
      }),
    }),
  }),
});

export const { useAddDataSourceMutation, useEditDataSourceMutation } =
  dataSourcesApi;
