import {} from "./types";
import { rootApi } from "@/state/services/apiService";

export const subscribeDatasetsApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    requestDataAccess: builder.mutation<ApiResponse<any>, any>({
      query: (credentials) => ({
        url: `/subscribe-datasets/request-access`,
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useRequestDataAccessMutation } = subscribeDatasetsApi;
