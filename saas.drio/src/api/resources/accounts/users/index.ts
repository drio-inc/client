// import {} from "./types";

import { rootApi } from "@/state/services/apiService";

export const userApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<User[], string>({
      query: (id) => ({
        url: `/resources/accounts/${id}/users`,
        method: "GET",
      }),
    }),

    addUser: builder.mutation<any, any>({
      query: (credentials) => ({
        url: `/resources/accounts/:accountId/ous`,
        method: "POST",
        body: credentials,
      }),
    }),

    updateUser: builder.mutation<any, any>({
      query: (credentials) => ({
        url: `/resources/accounts/:accountId/ous`,
        method: "PUT",
        body: credentials,
      }),
    }),
  }),
});

export const { useGetUsersQuery, useAddUserMutation, useUpdateUserMutation } =
  userApi;
