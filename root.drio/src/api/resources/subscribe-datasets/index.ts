import {} from "./types";
import { rootApi } from "@/state/services/apiService";

export const subscribeDatasetsApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    requestDataAccess: builder.mutation<any, any>({
      query: (payload) => ({
        url: `/resources/accounts/:accountId/subscribe-datasets/request-access`,
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useRequestDataAccessMutation } = subscribeDatasetsApi;
