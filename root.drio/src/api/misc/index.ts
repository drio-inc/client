import { Cities, Countries, States } from "./types";
import { rootApi } from "@/state/services/apiService";

const URL = "https://api.countrystatecity.in/v1";
const API_KEY = "UnJCdXptMUNYV2EwMnBCd0NnWDVuUm9mWDFsMzhydGtmMEFyS2ZsVA==";

const headers = {
  "X-CSCAPI-KEY": API_KEY,
};

export const miscApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getCountries: builder.query<Countries, void>({
      query: () => ({
        url: `${URL}/countries`,
        method: "GET",
        headers,
      }),
    }),

    getStates: builder.query<States, string>({
      query: (code) => ({
        url: `${URL}/countries/${code}/states`,
        method: "GET",
        headers,
      }),
    }),

    getCities: builder.query<Cities, { country: string; state: string }>({
      query: ({ country, state }) => ({
        url: `${URL}/countries/${country}/states/${state}/cities`,
        method: "GET",
        headers,
      }),
    }),
  }),
});

export const { useGetStatesQuery, useGetCitiesQuery, useGetCountriesQuery } =
  miscApi;
