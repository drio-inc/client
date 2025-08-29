import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

const API_URL = process.env.AI_API_URL;

const staggeredBaseQuery = retry(fetchBaseQuery({ baseUrl: `${API_URL}/ai/` }));

export const aiApi = createApi({
  reducerPath: "aiApi",
  baseQuery: staggeredBaseQuery,
  tagTypes: [],
  endpoints: (builder) => {
    return {
      getEvents: builder.mutation<any, { videoId: string }>({
        query: (body) => ({
          url: `/events`,
          method: "POST",
          body: body,
        }),
      }),
    };
  },
});

export const { useGetEventsMutation } = aiApi;
