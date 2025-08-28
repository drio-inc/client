import { rootApi } from "@/state/services/apiService";
import { EventResponse, ResetPipelineResponse } from "./types";

export const eventsApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    publishEvent: builder.mutation<EventResponse, { query: string }>({
      query: ({ query }) => {
        const formData = new FormData();
        formData.append("query", query);

        return {
          url: `/run-emergency-pipeline`,
          method: "POST",
          body: formData,
        };
      },
    }),

    resetGraph: builder.mutation<ResetPipelineResponse, null>({
      query: () => {
        return {
          url: `/run-clearance-pipeline`,
          method: "POST",
        };
      },
    }),
  }),
});

export const { usePublishEventMutation, useResetGraphMutation } = eventsApi;
