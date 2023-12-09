import { Quote } from "./types";
import { rootApi } from "@/state/services/apiService";

export const quotesApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getQuotes: builder.query<Quote[], void>({
      query: () => ({
        url: "/quotes",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetQuotesQuery } = quotesApi;
