import { Order, OrderParams } from "./types";
import { rootApi } from "@/state/services/apiService";

export const ordersApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<Order[], OrderParams>({
      query: (arg) => ({
        url: `/orders?name=${arg.name}&limit=${arg.limit}&offset=${arg.offset}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetOrdersQuery } = ordersApi;
