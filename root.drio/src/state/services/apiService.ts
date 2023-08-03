import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const MOCK_URL =
  "https://a14c37a0-5c64-4c14-ace9-784f0afc6ac8.mock.pstmn.io/api/v1";

export const rootApi = createApi({
  reducerPath: "rootApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://a14c37a0-5c64-4c14-ace9-784f0afc6ac8.mock.pstmn.io/api/v1`,
    //credentials: "include",
  }),

  endpoints: (builder) => {
    return {};
  },
});

export const {} = rootApi;
