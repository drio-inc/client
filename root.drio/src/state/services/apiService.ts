import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const rootApi = createApi({
  reducerPath: "rootApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${
      process.env.DEVELOPMENT_MODE === "mock"
        ? process.env.MOCK_URL
        : process.env.API_URL
    }`,
    credentials: "include",
  }),

  endpoints: (builder) => {
    return {};
  },
});

export const {} = rootApi;

// export const rootApi = createApi({
//   reducerPath: "rootApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: `/api`,
//     credentials: "include",
//   }),

//   endpoints: (builder) => {
//     return {};
//   },
// });

// export const {} = rootApi;
