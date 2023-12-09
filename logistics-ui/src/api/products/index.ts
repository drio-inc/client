import { Product, ProductParams } from "./types";
import { rootApi } from "@/state/services/apiService";

export const productsApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], ProductParams>({
      query: (arg) => ({
        url: `/products?name=${arg.name}&limit=${arg.limit}&offset=${arg.offset}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
