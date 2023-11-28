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
    prepareHeaders: (headers, { endpoint }) => {
      if (endpoint?.includes("login")) return headers;

      const token = getToken();

      if (token) headers.set("authorization", `Bearer ${token}`);

      return headers;
    },
  }),
  tagTypes: [
    "Accounts",
    "Account",
    "Data_Sources",
    "DDX_Clusters",
    "DDX_Instances",
    "Metadata_Servers",
    "Schema_Registries",
    "Organization_Units",
  ],
  endpoints: (builder) => {
    return {};
  },
});
