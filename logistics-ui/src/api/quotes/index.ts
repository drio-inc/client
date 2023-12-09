import { Quote, QuoteParams } from "./types";
import { rootApi } from "@/state/services/apiService";

export const quotesApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getQuotes: builder.query<Quote[], QuoteParams>({
      query: (args) => ({
        url: `/quotes?limit=${args.limit}&offset=${args.offset}&origin_port=${args.origin_port}&destination_port=${args.destination_port}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetQuotesQuery } = quotesApi;
