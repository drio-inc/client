import Button from "@ui/Button";
import { SelectInput, TextInput } from "@ui/Forms/Inputs";
import { Country, State, City } from "country-state-city";

import showAlert from "@ui/Alert";
import Layout from "@/comps/Layout";
import { SubmitHandler } from "react-hook-form";
import { useZodForm, Form } from "@ui/Forms/Form";

import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";

import { setCloseModal } from "@/state/slices/uiSlice";
import { setRows } from "@/state/slices/adminAccountSlice";
import { useAddAccountMutation } from "@/api/resources/accounts";

import {
  schema,
  FormData,
  nameFields,
  detailFields,
  FormKeyTypes,
  contactFields,
} from "@schema/AccountSchema";

export default function AddAccountForm() {
  const dispatch = useAppDispatch();
  const [addAccount, result] = useAddAccountMutation();
  const { rows } = useAppSelector((state) => state.adminAccount);

  const form = useZodForm({
    schema: schema,
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(data);

    try {
      const res = await addAccount({
        ou_name: "Corp",
        email: data.email,
        city: data.city ?? "",
        country: data.country,
        state: data.state ?? "",
        account_name: data.name,
        login_id: data.rootAdminID,
        last_name: data.rootAdminLastName ?? "",
        password: data.rootAdminInitialPassword,
        first_name: data.rootAdminFirstName ?? "",
      }).unwrap();

      dispatch(setRows([...rows, res]));
      dispatch(setCloseModal("addAccountForm"));
      showAlert("Account added successfully", "success");

      form.reset();
    } catch (err: any) {
      console.log(err);

      showAlert(
        err?.data?.message ?? "Something went wrong. Please try again.",
        "error"
      );
    }
  };

  return (
    <Layout>
      <Form
        form={form}
        onSubmit={onSubmit}
        className="min-w-full overflow-auto"
      >
        <div className="w-full mx-auto bg-white p-8 rounded-lg">
          <h2 className="text-gray-700 text-3xl font-bold my-4">Add Account</h2>

          <h2 className="text-gray-700 text-2xl font-bold my-4">
            Account Information
          </h2>

          <div className="flex flex-wrap -m-2 shadow-md p-2 rounded-lg bg-gray-50 my-4">
            {nameFields.map((field) => (
              <div className="px-4 py-2 w-full" key={field.name}>
                <TextInput
                  type={field.type}
                  label={field.label}
                  required={field.required}
                  placeholder={field.placeholder}
                  autoComplete={field.autoComplete}
                  className="md:text-sm 2xl:text-base"
                  {...form.register(field.name as FormKeyTypes)}
                />
              </div>
            ))}

            <div className="px-4 py-2 w-1/2">
              <SelectInput
                label="Country"
                required={true}
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

            <div className="px-4 py-2 w-1/2">
              <SelectInput
                registerName="state"
                label="State / Province"
                placeholder="Select state"
                options={
                  State.getStatesOfCountry(form.watch("country") as string).map(
                    (state) => ({
                      label: state.name,
                      value: state.isoCode,
                    })
                  ) ?? []
                }
              />
            </div>

            <div className="px-4 py-2 w-1/2">
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

            <div className="px-4 py-2 w-1/2">
              <TextInput
                label={"Zip Code"}
                {...form.register("zipCode")}
                placeholder={"Enter zip code"}
                className="md:text-sm 2xl:text-base"
              />
            </div>

            <div className="px-4 py-2 w-full">
              <TextInput
                label={"Description"}
                {...form.register("description")}
                placeholder={"Enter description"}
                className="md:text-sm 2xl:text-base"
              />
            </div>
          </div>

          <h2 className="text-gray-700 text-2xl font-bold my-4">
            Account Details
          </h2>

          <div className="flex flex-wrap -m-2 shadow-md p-2 rounded-lg bg-gray-50 my-4">
            {detailFields.map((field) => (
              <div className="px-4 py-2 w-full md:w-1/2" key={field.name}>
                <TextInput
                  type={field.type}
                  label={field.label}
                  required={field.required}
                  placeholder={field.placeholder}
                  autoComplete={field.autoComplete}
                  className="md:text-sm 2xl:text-base"
                  {...form.register(field.name as FormKeyTypes)}
                />
              </div>
            ))}
          </div>

          <h2 className="text-gray-700 text-2xl font-bold my-4">
            Primary Contact Information
          </h2>

          <div className="flex flex-wrap -m-2 shadow-md p-2 rounded-lg bg-gray-50 my-4">
            {contactFields.map((field) => (
              <div className="px-4 py-2 w-full md:w-1/2" key={field.name}>
                <TextInput
                  type={field.type}
                  label={field.label}
                  required={field.required}
                  placeholder={field.placeholder}
                  autoComplete={field.autoComplete}
                  className="md:text-sm 2xl:text-base"
                  defaultValue={
                    field.name === "firstName"
                      ? form.watch("rootAdminFirstName")
                      : field.name === "lastName"
                      ? form.watch("rootAdminLastName")
                      : ""
                  }
                  {...form.register(field.name as FormKeyTypes)}
                />
              </div>
            ))}
          </div>

          <div className="py-2 flex justify-center md:justify-end w-full mt-4">
            <Button
              type="button"
              intent={`secondary`}
              onClick={() => dispatch(setCloseModal("addAccountForm"))}
              className="w-full md:w-auto mr-2 md:mr-6"
            >
              <span className="inline-flex justify-center w-full">Cancel</span>
            </Button>

            <Button
              intent={`primary`}
              className="w-full md:w-auto"
              isLoading={result.isLoading}
            >
              <span className="inline-flex justify-center w-full">
                Add Account
              </span>
            </Button>
          </div>
        </div>
      </Form>
    </Layout>
  );
}
