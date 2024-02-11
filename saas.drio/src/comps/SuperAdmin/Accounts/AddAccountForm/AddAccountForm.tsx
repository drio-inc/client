import Button from "@ui/Button";
import { SelectInput, TextInput } from "@ui/Forms/Inputs";

import showAlert from "@ui/Alert";
import Layout from "@/comps/Layout";
import { SubmitHandler } from "react-hook-form";
import { useZodForm, Form } from "@ui/Forms/Form";
import { useAppDispatch } from "@/hooks/useStoreTypes";

import {
  useGetCitiesQuery,
  useGetStatesQuery,
  useGetCountriesQuery,
} from "@/api/misc";
import { setCloseModal } from "@/state/slices/uiSlice";
import { useCreateAccountMutation } from "@/api/resources/accounts";

import {
  nameFields,
  detailFields,
  createSchema,
  contactFields,
  CreateFormData,
  CreateFormKeyTypes,
} from "@schema/AccountSchema";

export default function AddAccountForm() {
  const dispatch = useAppDispatch();
  const [create, result] = useCreateAccountMutation();

  const form = useZodForm({
    schema: createSchema,
  });

  const { data: countries } = useGetCountriesQuery();
  const { data: states } = useGetStatesQuery(form.watch("country"), {
    skip: !form.watch("country"),
  });

  const { data: cities } = useGetCitiesQuery(
    {
      state: form.watch("state"),
      country: form.watch("country"),
    },
    {
      skip: !form.watch("state"),
    }
  );

  const onSubmit: SubmitHandler<CreateFormData> = async (data) => {
    try {
      const res = await create({
        ou_name: "Corp",
        email: data.email,
        city: data.city ?? "",
        country: data.country,
        state: data.state ?? "",
        login_id: data.login_id,
        password: data.password,
        account_name: data.account_ID,
        last_name: data.last_name ?? "",
        first_name: data.first_name ?? "",
      }).unwrap();

      dispatch(setCloseModal("addAccountForm"));
      showAlert("Account added successfully", "success");

      form.reset();
    } catch (err: any) {
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
                  {...form.register(field.name as CreateFormKeyTypes)}
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
                  countries?.map((country) => ({
                    label: country.name,
                    value: country.iso2,
                  })) ?? []
                }
              />
            </div>

            <div className="px-4 py-2 w-1/2">
              <SelectInput
                required={true}
                registerName="state"
                label="State / Province"
                placeholder="Select state"
                options={
                  states?.map((state) => ({
                    label: state.name,
                    value: state.iso2,
                  })) ?? []
                }
              />
            </div>

            <div className="px-4 py-2 w-1/2">
              <SelectInput
                label="City"
                required={true}
                registerName="city"
                placeholder="Select city"
                options={
                  cities?.map((city) => ({
                    label: city.name,
                    value: city.name,
                  })) ?? []
                }
              />
            </div>

            <div className="px-4 py-2 w-1/2">
              <TextInput
                label={"Zip Code"}
                {...form.register("zip_code")}
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
                  {...form.register(field.name as CreateFormKeyTypes, {
                    onChange: (e) =>
                      form.setValue(
                        (field.name as CreateFormKeyTypes) ?? "",
                        e.target.value
                      ),
                  })}
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
                  {...form.register(field.name as CreateFormKeyTypes, {
                    onChange: (e) =>
                      form.setValue(
                        (field.name as CreateFormKeyTypes) ?? "",
                        e.target.value
                      ),
                  })}
                  defaultValue={
                    field.name === "first_name_2"
                      ? form.watch("first_name")
                      : field.name === "last_name_2"
                      ? form.watch("last_name")
                      : ""
                  }
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
              disabled={result.isLoading}
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
