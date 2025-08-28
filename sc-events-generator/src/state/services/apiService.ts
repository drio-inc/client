import { getToken } from "@/utils/token";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const rootApi = createApi({
  reducerPath: "rootApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.API_URL || "http://localhost:8000"}`,
  }),

  tagTypes: ["Products"],

  endpoints: () => ({}),
});

export const {} = rootApi;
