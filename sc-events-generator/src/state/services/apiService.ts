import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const rootApi = createApi({
  reducerPath: "rootApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.API_URL || "https://controller.ddx.drio.ai:6443"}`,
  }),

  endpoints: () => ({}),
});

export const {} = rootApi;
