import Button from "@ui/Button";
import { SelectInput, TextInput } from "@ui/Forms/Inputs";
import { Country, State, City } from "country-state-city";

import showAlert from "@ui/Alert";
import Layout from "@/comps/Layout";

import { SubmitHandler } from "react-hook-form";
import { useZodForm, Form } from "@ui/Forms/Form";
import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";

import { setRows } from "@/state/slices/orgUnitSlice";
import { setCloseModal } from "@/state/slices/uiSlice";
import { usePatchOrgUnitMutation } from "@/api/resources/ous";

import {
  updateOrgUnitSchema,
  UpdateOrgUnitFormData,
} from "@/schema/OrgUnitSchema";

import StaticLoader from "@/comps/ui/Loader/StaticLoader";
import { useEffect, useState } from "react";

export default function EditOrgUnitForm({ row }: TableRow) {
  const dispatch = useAppDispatch();
  const [patch, result] = usePatchOrgUnitMutation();
  const { rows } = useAppSelector((state) => state.orgUnit);

  const [defaultCountry, setDefaultCountry] = useState(
    Country.getAllCountries().find((c) => c.isoCode === row?.country)
  );
  const [defaultState, setDefaultState] = useState(
    State.getStatesOfCountry(row?.country).find((s) => s.isoCode === row?.state)
  );

  const [defaultCity, setDefaultCity] = useState(
    City.getCitiesOfState(row?.country ?? "", row?.state ?? "").find(
      (c) => c.name === row?.city
    )
  );

  const form = useZodForm({
    schema: updateOrgUnitSchema,
  });

  useEffect(() => {
    setDefaultCountry(
      Country.getAllCountries().find((c) => c.isoCode === row?.country)
    );
    setDefaultState(
      State.getStatesOfCountry(row?.country).find(
        (s) => s.isoCode === row?.state
      )
    );
    setDefaultCity(
      City.getCitiesOfState(row?.country ?? "", row?.state ?? "").find(
        (c) => c.name === row?.city
      )
    );
  }, [row?.city, row?.country, row?.state]);

  const onSubmit: SubmitHandler<UpdateOrgUnitFormData> = async (data) => {
    try {
      const res = await patch({
        name: data.ou,
        city: data.city,
        state: data.state,
        country: data.country,
        ou_id: row?.id ?? "",
        street_address: data.streetAddress,
        account_id: row?.account_id ?? "",
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
                  defaultValue={row?.name ?? ""}
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
                    value: defaultCountry?.isoCode ?? "",
                  }}
                  options={
                    Country.getAllCountries().map((country) => ({
                      label: country.name,
                      value: country.isoCode,
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
                    value: defaultState?.isoCode ?? "",
                  }}
                  options={
                    State.getStatesOfCountry(
                      form.watch("country") ?? row?.country ?? ""
                    ).map((state) => ({
                      label: state.name,
                      value: state.isoCode,
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
                    City.getCitiesOfState(
                      form.watch("country") ?? row?.country ?? "",
                      form.watch("state") ?? row?.state ?? ""
                    ).map((city) => ({
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
