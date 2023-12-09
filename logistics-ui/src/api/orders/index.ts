import { Order } from "./types";
import { rootApi } from "@/state/services/apiService";

export const ordersApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<Order[], void>({
      query: () => ({
        url: `/orders?`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetOrdersQuery } = ordersApi;
