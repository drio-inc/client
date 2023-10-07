import { Quote, Quotes } from "./types";
import { rootApi } from "@/state/services/apiService";

export const quotesApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getQuotes: builder.query<Quotes, void>({
      query: () => ({
        url: "/resources/quotes",
        method: "GET",
      }),
    }),

    getQuoteById: builder.query<Quote, string>({
      query: (id) => ({
        url: `/resources/quotes/${id}?recurse=true`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetQuotesQuery, useGetQuoteByIdQuery } = quotesApi;
