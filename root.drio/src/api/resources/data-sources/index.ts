import {} from "./types";
import { rootApi } from "@/state/services/apiService";

export const dataSourcesApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    addDataSource: builder.mutation<ApiResponse<any>, any>({
      query: (credentials) => ({
        url: `/data-source/add`,
        method: "POST",
        body: credentials,
      }),
    }),

    editDataSource: builder.mutation<ApiResponse<any>, any>({
      query: (credentials) => ({
        url: `/data-source/update`,
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useAddDataSourceMutation, useEditDataSourceMutation } =
  dataSourcesApi;
