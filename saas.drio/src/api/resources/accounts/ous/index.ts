// import {} from "./types";

import { rootApi } from "@/state/services/apiService";

export const orgUnitApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrganizationUnits: builder.query<OrganizationUnit, string>({
      query: (id) => ({
        url: `/resources/accounts/${id}/ous`,
        method: "GET",
      }),
    }),

    addOrgUnit: builder.mutation<any, any>({
      query: (payload) => ({
        url: `/resources/accounts/:accountId/ous`,
        method: "POST",
        body: payload,
      }),
    }),

    updateOrgUnit: builder.mutation<any, any>({
      query: (payload) => ({
        url: `/resources/accounts/:accountId/ous`,
        method: "PUT",
        body: payload,
      }),
    }),
  }),
});

export const {
  useAddOrgUnitMutation,
  useUpdateOrgUnitMutation,
  useGetOrganizationUnitsQuery,
} = orgUnitApi;
