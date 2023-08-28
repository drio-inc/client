import Button from "@ui/Button";
import { SelectInput, TextInput } from "@ui/Forms/Inputs";
import { Country, State, City } from "country-state-city";

import showAlert from "@ui/Alert";
import Layout from "@/comps/Layout";

import { SubmitHandler } from "react-hook-form";
import { useZodForm, Form } from "@ui/Forms/Form";

import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";
import { useCreateOrgUnitMutation } from "@/api/resources/accounts/ous";

import { setRows } from "@/state/slices/orgUnitSlice";
import { setCloseModal } from "@/state/slices/uiSlice";

import {
  createOrgUnitSchema,
  CreateOrgUnitFormData,
} from "@/schema/OrgUnitSchema";

export default function AddOrgUnitForm() {
  const dispatch = useAppDispatch();
  const [create, result] = useCreateOrgUnitMutation({});
  const rows = useAppSelector((state) => state.orgUnit.rows);
  const { accountId } = useAppSelector((state) => state.account);

  console.log(accountId);

  const form = useZodForm({
    schema: createOrgUnitSchema,
  });

  const onSubmit: SubmitHandler<CreateOrgUnitFormData> = async (data) => {
    try {
      const res = await create({
        name: data.ou,
        city: data.city,
        state: data.state,
        id: accountId ?? "",
        country: data.country,
        street_address: data.streetAddress,
      }).unwrap();

      dispatch(setRows([...rows, res]));
      dispatch(setCloseModal("addOrgUnitForm"));
      showAlert("Organization Unit added successfully", "success");
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
            Add New Organization Unit
          </h2>
          <div className="flex flex-wrap p-2 rounded-lg">
            <div className="px-4 py-2 w-full">
              <div className="relative">
                <TextInput
                  label="Organization Unit"
                  placeholder="Enter name"
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
              <div className="">
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
                      form.watch("country") as string
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
                      form.watch("country") as string,
                      form.watch("state") as string
                    ).map((city) => ({
                      label: city.name,
                      value: city.name,
                    })) ?? []
                  }
                />
              </div>
            </div>
          </div>

          <div className="px-6 flex justify-center w-full">
            <Button
              type="button"
              intent={`secondary`}
              className="w-full mr-2 md:mr-6"
              onClick={() => dispatch(setCloseModal("addOrgUnitForm"))}
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
