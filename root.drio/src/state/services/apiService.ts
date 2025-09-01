import { getToken } from "@/utils/token";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const rootApi = createApi({
  reducerPath: "rootApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.API_URL || "https://controller.ddx.drio.ai/api/v1"}`,
    prepareHeaders: (headers, { endpoint }) => {
      if (endpoint?.includes("login")) return headers;

      const token = getToken();

      if (token && !headers.has("authorization")) headers.set("authorization", `Bearer ${token}`);

      return headers;
    },
  }),
  tagTypes: [
    "Account",
    "Accounts",
    "Datasets",
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
