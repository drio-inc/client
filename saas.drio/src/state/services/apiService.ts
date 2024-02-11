import { getToken } from "@/utils/token";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const rootApi = createApi({
  reducerPath: "rootApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${
      process.env.DEVELOPMENT_MODE === "mock"
        ? process.env.MOCK_URL
        : process.env.API_URL
    }`,

    prepareHeaders: (headers, { getState, endpoint }) => {
      if (endpoint?.includes("login")) return headers;

      const token = getToken();

      if (token) headers.set("authorization", `Bearer ${token}`);

      return headers;
    },
  }),

  tagTypes: ["Accounts", "Organization_Units"],

  endpoints: () => ({}),
});

export const {} = rootApi;
