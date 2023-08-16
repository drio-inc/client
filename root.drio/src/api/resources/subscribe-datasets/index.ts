import {} from "./types";
import { rootApi } from "@/state/services/apiService";

export const subscribeDatasetsApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    requestDataAccess: builder.mutation<any, any>({
      query: (credentials) => ({
        url: `/resources/accounts/:accountId/subscribe-datasets/request-access`,
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useRequestDataAccessMutation } = subscribeDatasetsApi;
