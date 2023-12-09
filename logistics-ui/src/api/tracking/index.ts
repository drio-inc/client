import { TrackingData } from "./types";
import { rootApi } from "@/state/services/apiService";

export const trackingDataApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getTrackingData: builder.query<TrackingData[], void>({
      query: () => ({
        url: "/tracking",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetTrackingDataQuery } = trackingDataApi;
