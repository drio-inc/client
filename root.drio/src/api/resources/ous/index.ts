import { rootApi } from "@/state/services/apiService";
import { OrgUnitFormData, DeleteOrgUnitResponse } from "./types";

export const orgUnitApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrgUnits: builder.query<OrganizationUnit[], string>({
      query: (id) => ({
        url: `/resources/accounts/${id}/ous`,
        method: "GET",
      }),
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "Organization_Units" as const,
                id,
              })),
              "Organization_Units",
            ]
          : ["Organization_Units"],
    }),

    getOrgUnitById: builder.query<
      OrganizationUnit,
      {
        ou_id: string;
        account_id: string;
      }
    >({
      query: ({ account_id, ou_id }) => ({
        url: `/resources/accounts/${account_id}/ous/${ou_id}`,
        method: "GET",
      }),
    }),

    createOrgUnit: builder.mutation<
      OrganizationUnit,
      OrgUnitFormData & { id: string }
    >({
      query: (payload) => ({
        url: `/resources/accounts/${payload.id}/ous`,
        method: "POST",
        body: {
          ...payload,
          id: undefined,
        },
      }),
      invalidatesTags: ["Organization_Units"],
    }),

    updateOrgUnit: builder.mutation<
      OrganizationUnit,
      OrgUnitFormData & { account_id: string; ou_id: string }
    >({
      query: (payload) => ({
        url: `/resources/accounts/${payload.account_id}/ous/${payload.ou_id}`,
        method: "PUT",
        body: {
          ...payload,
          ou_id: undefined,
          account_id: undefined,
        },
      }),
    }),

    patchOrgUnit: builder.mutation<
      OrganizationUnit,
      OrgUnitFormData & { account_id: string; ou_id: string }
    >({
      query: (payload) => ({
        url: `/resources/accounts/${payload.account_id}/ous/${payload.ou_id}`,
        method: "PATCH",
        body: {
          ...payload,
          ou_id: undefined,
          account_id: undefined,
        },
      }),
      invalidatesTags: ["Organization_Units"],
    }),

    deleteOrgUnit: builder.mutation<
      DeleteOrgUnitResponse,
      { account_id: string; ou_id: string }
    >({
      query: ({ account_id, ou_id }) => ({
        url: `/resources/accounts/${account_id}/ous/${ou_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Organization_Units"],
    }),
  }),
});

export const {
  useGetOrgUnitsQuery,
  useGetOrgUnitByIdQuery,
  usePatchOrgUnitMutation,
  useCreateOrgUnitMutation,
  useUpdateOrgUnitMutation,
  useDeleteOrgUnitMutation,
} = orgUnitApi;
