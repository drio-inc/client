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

    updateAccount: builder.mutation<
      AccountCreationResponse,
      AccountFormData & { id: string }
    >({
      query: (credentials) => ({
        url: `/resources/accounts/${credentials.id}`,
        method: "PUT",
        body: {
          ...credentials,
          id: undefined,
        },
      }),
      invalidatesTags: ["Accounts"],
    }),

    deleteAccount: builder.mutation<ApiResponse<any>, any>({
      query: (credentials) => ({
        url: `/resources/accounts/:accountId`,
        method: "DELETE",
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
  useUpdateAccountMutation,
  useDeleteAccountMutation,
} = accountApi;
