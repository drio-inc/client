import { Product, Products } from "./types";
import { rootApi } from "@/state/services/apiService";

export const productsApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Products, void>({
      query: () => ({
        url: "/resources/products",
        method: "GET",
      }),
    }),

    getProductById: builder.query<Product, string>({
      query: (id) => ({
        url: `/resources/products/${id}?recurse=true`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi;
