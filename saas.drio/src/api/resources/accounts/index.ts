import { rootApi } from "@/state/services/apiService";
import {
  Account,
  Accounts,
  AccountFormData,
  AccountCreationResponse,
} from "./types";

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

    getAccountById: builder.query<Account, void>({
      query: (id) => ({
        url: `/resources/accounts/${id}`,
        method: "GET",
      }),
    }),

    addAccount: builder.mutation<AccountCreationResponse, AccountFormData>({
      query: (credentials) => ({
        url: `/resources/register`,
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Accounts"],
    }),

    editAccount: builder.mutation<ApiResponse<any>, FormData>({
      query: (credentials) => ({
        url: `/saas/edit-account`,
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Accounts"],
    }),

    deleteAccount: builder.mutation<ApiResponse<any>, FormData>({
      query: (credentials) => ({
        url: `/resources/delete`,
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Accounts"],
    }),
  }),
});

export const {
  useGetAccountsQuery,
  useGetAccountByIdQuery,

  useAddAccountMutation,
  useEditAccountMutation,
  useDeleteAccountMutation,
} = accountApi;
