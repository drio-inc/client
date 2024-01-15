import { Anomaly } from "./types";
import { rootApi } from "@/state/services/apiService";

export const anomaliesApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getAnomalies: builder.query<
      Anomaly,
      DefaultParams & { datasource_id: string }
    >({
      query: ({ account_id, ou_id, datasource_id }) => ({
        url: `/resources/accounts/${account_id}/ous/${ou_id}/data-sources/${datasource_id}/anomalies`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAnomaliesQuery } = anomaliesApi;
