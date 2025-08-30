import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const rootApi = createApi({
  reducerPath: "rootApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.API_URL || "http://controller.ddx.drio.ai:8000"}`,
  }),

  endpoints: () => ({}),
});

export const {} = rootApi;
