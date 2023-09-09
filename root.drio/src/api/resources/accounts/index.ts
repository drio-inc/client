import { rootApi } from "@/state/services/apiService";

import { Account, Accounts } from "./types";

export const accountApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getAccounts: builder.query<Accounts, void>({
      query: () => ({
        url: "/resources/accounts",
        method: "GET",
      }),
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "Accounts" as const,
                id,
              })),
              "Accounts",
            ]
          : ["Accounts"],
    }),

    getAccountById: builder.query<Account, string>({
      query: (id) => ({
        url: `/resources/accounts/${id}?recurse=true`,
        method: "GET",
      }),
      providesTags: ["Account"],
    }),
  }),
});

export const { useGetAccountsQuery, useGetAccountByIdQuery } = accountApi;
