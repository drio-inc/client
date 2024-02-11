import Button from "@ui/Button";
import { SelectInput, TextInput } from "@ui/Forms/Inputs";

import showAlert from "@ui/Alert";
import Layout from "@/comps/Layout";

import { SubmitHandler } from "react-hook-form";
import { useZodForm, Form } from "@ui/Forms/Form";
import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";

import { setRows } from "@/state/slices/orgUnitSlice";
import { setCloseModal } from "@/state/slices/uiSlice";
import StaticLoader from "@/comps/ui/Loader/StaticLoader";
import { usePatchOrgUnitMutation } from "@/api/resources/accounts/ous";

import {
  updateOrgUnitSchema,
  UpdateOrgUnitFormData,
} from "@/schema/OrgUnitSchema";

import {
  useGetCitiesQuery,
  useGetStatesQuery,
  useGetCountriesQuery,
} from "@/api/misc";

export default function EditOrgUnitForm() {
  const dispatch = useAppDispatch();
  const [patch, result] = usePatchOrgUnitMutation();
  const { rows, row: orgUnitRow } = useAppSelector((state) => state.orgUnit);

  const form = useZodForm({
    schema: updateOrgUnitSchema,
  });

  const { data: countries, isLoading: isCountriesLoading } =
    useGetCountriesQuery();

  const { data: states, isLoading: isStatesLoading } = useGetStatesQuery(
    form.watch("country") ?? orgUnitRow?.country ?? ""
  );

  const { data: cities, isLoading: isCitiesLoading } = useGetCitiesQuery({
    country: form.watch("country") ?? orgUnitRow?.country ?? "",
    state: form.watch("state") ?? orgUnitRow?.state ?? "",
  });

  const onSubmit: SubmitHandler<UpdateOrgUnitFormData> = async (data) => {
    try {
      const res = await patch({
        name: data.ou,
        city: data.city,
        state: data.state,
        country: data.country,
        ou_id: orgUnitRow?.id ?? "",
        street_address: data.streetAddress,
        account_id: orgUnitRow?.account_id ?? "",
      }).unwrap();

      dispatch(setRows(rows.map((row) => (row.id === res.id ? res : row))));
      dispatch(setCloseModal("editOrgUnitForm"));

      showAlert("Organization unit updated successfully", "success");
    } catch (err: any) {
      showAlert(
        err?.data?.message ?? "Something went wrong. Please try again.",
        "error"
      );
    }
  };

  if (isCountriesLoading || isStatesLoading || isCitiesLoading) {
    return <StaticLoader />;
  }

  const defaultCountry = countries?.find(
    (country) => country.iso2 === orgUnitRow?.country
  );

  const defaultState = states?.find(
    (state) => state.iso2 === orgUnitRow?.state
  );

  const defaultCity = cities?.find((city) => city.name === orgUnitRow?.city);

  return (
    <Layout>
      <Form form={form} onSubmit={onSubmit} className="min-w-full">
        <div className="max-w-md w-full mx-auto bg-white px-4 py-8 rounded-lg">
          <h2 className="text-gray-700 text-2xl font-bold mb-4 text-center">
            Edit Organization Unit
          </h2>
          <div className="flex flex-wrap p-2 rounded-lg">
            <div className="px-4 py-2 w-full">
              <div className="relative">
                <TextInput
                  label="Organization Unit"
                  placeholder="Enter OU"
                  {...form.register("ou")}
                  defaultValue={orgUnitRow?.name ?? ""}
                />
              </div>
            </div>

            <div className="px-4 py-2 w-full">
              <div className="relative">
                <TextInput
                  label="Street Address"
                  placeholder="Enter street address"
                  {...form.register("streetAddress")}
                />
              </div>
            </div>

            <div className="px-4 py-2 w-full">
              <div className="relative">
                <SelectInput
                  label="Country"
                  registerName="country"
                  placeholder="Select country"
                  defaultSelectedValue={{
                    label: defaultCountry?.name ?? "",
                    value: defaultCountry?.iso2 ?? "",
                  }}
                  options={
                    countries?.map((country) => ({
                      label: country.name,
                      value: country.iso2,
                    })) ?? []
                  }
                />
              </div>
            </div>

            <div className="px-4 py-2 w-full">
              <div className="relative">
                <SelectInput
                  label="State / Province"
                  registerName="state"
                  placeholder="Select state"
                  defaultSelectedValue={{
                    label: defaultState?.name ?? "",
                    value: defaultState?.iso2 ?? "",
                  }}
                  options={
                    states?.map((state) => ({
                      label: state.name,
                      value: state.iso2,
                    })) ?? []
                  }
                />
              </div>
            </div>

            <div className="px-4 py-2 w-full">
              <div className="relative">
                <SelectInput
                  label="City"
                  registerName="city"
                  placeholder="Select city"
                  defaultSelectedValue={{
                    label: defaultCity?.name ?? "",
                    value: defaultCity?.name ?? "",
                  }}
                  options={
                    cities?.map((city) => ({
                      label: city.name,
                      value: city.name,
                    })) ?? []
                  }
                />
              </div>
            </div>
          </div>
          <div className="my-2 px-6 flex justify-center w-full">
            <Button
              type="button"
              intent={`secondary`}
              onClick={() => dispatch(setCloseModal("editOrgUnitForm"))}
              className="w-full mr-2 md:mr-6"
            >
              <span className="inline-flex justify-center w-full">Cancel</span>
            </Button>

            <Button
              intent={`primary`}
              className="w-full"
              isLoading={result.isLoading}
            >
              <span className="inline-flex justify-center w-full">Save</span>
            </Button>
          </div>
        </div>
      </Form>
    </Layout>
  );
}
