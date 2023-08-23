import { rootApi } from "@/state/services/apiService";
import {
  Account,
  Accounts,
  RegisterFormData,
  DeleteAccountResponse,
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

    getAccountById: builder.query<Account, string>({
      query: (id) => ({
        url: `/resources/accounts/${id}`,
        method: "GET",
      }),
    }),

    createAccount: builder.mutation<AccountCreationResponse, RegisterFormData>({
      query: (payload) => ({
        url: `/resources/register`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Accounts"],
    }),

    updateAccount: builder.mutation<
      AccountCreationResponse,
      RegisterFormData & { id: string }
    >({
      query: (payload) => ({
        url: `/resources/accounts/${payload.id}`,
        method: "PUT",
        body: {
          ...payload,
          id: undefined,
        },
      }),
      invalidatesTags: ["Accounts"],
    }),

    patchAccount: builder.mutation<Account, Partial<Account>>({
      query: (payload) => ({
        url: `/resources/accounts/${payload.id}`,
        method: "PATCH",
        body: {
          ...payload,
          id: undefined,
        },
      }),
      invalidatesTags: ["Accounts"],
    }),

    deleteAccount: builder.mutation<DeleteAccountResponse, string>({
      query: (id) => ({
        url: `/resources/accounts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Accounts"],
    }),
  }),
});

export const {
  useGetAccountsQuery,
  useGetAccountByIdQuery,
  usePatchAccountMutation,
  useCreateAccountMutation,
  useUpdateAccountMutation,
  useDeleteAccountMutation,
} = accountApi;
