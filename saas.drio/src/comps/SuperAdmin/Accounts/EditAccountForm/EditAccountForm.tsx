import Button from "@ui/Button";
import { SelectInput, TextInput } from "@ui/Forms/Inputs";
import { Country, State, City } from "country-state-city";

import showAlert from "@ui/Alert";
import Layout from "@/comps/Layout";
import { SubmitHandler } from "react-hook-form";
import { useZodForm, Form } from "@ui/Forms/Form";

import { setCloseModal } from "@/state/slices/uiSlice";
import { setRows } from "@/state/slices/adminAccountSlice";
import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";

import {
  useGetAccountByIdQuery,
  useUpdateAccountMutation,
} from "@/api/resources/accounts";

import {
  schema,
  FormData,
  nameFields,
  detailFields,
  FormKeyTypes,
  contactFields,
} from "@schema/AccountSchema";

import StaticLoader from "@/comps/ui/Loader/StaticLoader";
import { Account } from "@/api/resources/accounts/types";

export default function EditAccountForm({ row }: TableRow) {
  const dispatch = useAppDispatch();
  const [updateAccount, result] = useUpdateAccountMutation();
  const { rows } = useAppSelector((state) => state.adminAccount);
  const { data, error, isLoading } = useGetAccountByIdQuery(row.id);

  const form = useZodForm({
    schema: schema,
  });

  const defaultCountry = Country.getAllCountries().find(
    (c) => c.isoCode === data?.country
  );

  const defaultState = State.getStatesOfCountry(data?.country ?? "").find(
    (s) => s.isoCode === data?.state
  );

  const defaultCity = City.getCitiesOfState(
    data?.country ?? "",
    data?.state ?? ""
  ).find((c) => c.name === data?.city);

  const onSubmit: SubmitHandler<FormData> = async (updatedData) => {
    try {
      const res = await updateAccount({
        id: row.id,
        ou_name: "Corp",
        email: updatedData.email,
        city: updatedData.city ?? "",
        country: updatedData.country,
        state: updatedData.state ?? "",
        account_name: updatedData.name,
        login_id: updatedData.rootAdminID,
        last_name: updatedData.lastName ?? "",
        first_name: updatedData.firstName ?? "",
        password: updatedData.rootAdminInitialPassword,
      }).unwrap();

      dispatch(setRows([...rows, res]));
      dispatch(setCloseModal("editAccountForm"));
      showAlert("Account updated successfully", "success");

      form.reset();
    } catch (err: any) {
      showAlert(
        err?.data?.message ?? "Something went wrong. Please try again.",
        "error"
      );
    }
  };

  if (isLoading) return <StaticLoader />;

  type AccountField = keyof Omit<
    Account,
    "id" | "status" | "organization_units" | "users"
  >;

  return (
    <Layout>
      <Form
        form={form}
        onSubmit={onSubmit}
        className="min-w-full overflow-auto"
      >
        <div className="w-full mx-auto bg-white p-8 rounded-lg">
          <h2 className="text-gray-700 text-3xl font-bold my-4">
            Edit Account
          </h2>

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
                  defaultValue={
                    data && field.name in data
                      ? data[field.name as AccountField]
                      : ""
                  }
                />
              </div>
            ))}

            <div className="px-4 py-2 w-1/2">
              <SelectInput
                label="Country"
                required={true}
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

            <div className="px-4 py-2 w-1/2">
              <SelectInput
                registerName="state"
                label="State / Province"
                placeholder="Select state"
                defaultSelectedValue={{
                  label: defaultState?.name ?? "",
                  value: defaultState?.isoCode ?? "",
                }}
                options={
                  State.getStatesOfCountry(
                    form.watch("country") ?? data?.country ?? ""
                  ).map((state) => ({
                    label: state.name,
                    value: state.isoCode,
                  })) ?? []
                }
              />
            </div>

            <div className="px-4 py-2 w-1/2">
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
                    form.watch("country") ?? data?.country ?? "",
                    form.watch("state") ?? data?.state ?? ""
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
                  className="md:text-sm 2xl:text-base"
                  {...form.register(field.name as FormKeyTypes)}
                  defaultValue={
                    field.name === "firstName"
                      ? ""
                      : field.name === "lastName"
                      ? ""
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
              className="w-full md:w-auto mr-2 md:mr-6"
              onClick={() => dispatch(setCloseModal("editAccountForm"))}
            >
              <span className="inline-flex justify-center w-full">Cancel</span>
            </Button>

            <Button
              intent={`primary`}
              className="w-full md:w-auto"
              isLoading={result.isLoading}
            >
              <span className="inline-flex justify-center w-full">Update</span>
            </Button>
          </div>
        </div>
      </Form>
    </Layout>
  );
}
