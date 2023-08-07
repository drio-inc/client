import Button from "@ui/Button";
import { SelectInput, TextInput } from "@ui/Forms/Inputs";
import { Country, State, City } from "country-state-city";

import showAlert from "@ui/Alert";
import Layout from "@/comps/Layout";

import { z } from "zod";
import { SubmitHandler } from "react-hook-form";
import { useZodForm, Form } from "@ui/Forms/Form";

import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";

import { useEditOrgAccountMutation } from "@/api/resources/ous";
import { setCloseModal } from "@/state/slices/uiSlice";
import { setRows } from "@/state/slices/orgUnitSlice";

const schema = z.object({
  ou: z.string().nonempty("Please Enter a value"),
  streetAddress: z.string().nonempty("Please Enter a value"),
  country: z.string({
    required_error: "Please select a country",
  }),
  state: z.string({
    required_error: "Please select a state",
  }),
  city: z.string({
    required_error: "Please select a city",
  }),
});

type FormData = z.infer<typeof schema>;

export default function EditOrgAccountForm({ row }: TableRow) {
  const dispatch = useAppDispatch();
  const [editOrgAccount, result] = useEditOrgAccountMutation();
  const orgUnitState = useAppSelector((state) => state.orgUnit);

  const form = useZodForm({
    schema: schema,
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const res = await editOrgAccount({
        ...data,
        id: row.id,
      }).unwrap();

      dispatch(
        setRows(orgUnitState.rows.map((row) => (row.id === res.id ? res : row)))
      );

      dispatch(setCloseModal("editOrgAccountForm"));
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
        <div className="max-w-md w-full mx-auto bg-white p-4 rounded-lg">
          <h2 className="text-gray-700 text-2xl font-bold my-4 text-center">
            Edit Organization Unit
          </h2>
          <div className="flex flex-wrap p-2 rounded-lg">
            <div className="px-4 py-2 w-full">
              <div className="relative">
                <TextInput
                  label="Organization Unit"
                  placeholder="Enter OU"
                  defaultValue={row.ou}
                  {...form.register("ou")}
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
                  options={
                    State.getStatesOfCountry(
                      row.country ?? form.watch("country")
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
                  options={
                    City.getCitiesOfState(
                      row.country ?? form.watch("country"),
                      row.state ?? form.watch("state")
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
              onClick={() => dispatch(setCloseModal("editOrgAccountForm"))}
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
