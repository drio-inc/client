import Button from "@ui/Button";
import { SelectInput, TextInput } from "@ui/Forms/Inputs";

import showAlert from "@ui/Alert";
import Layout from "@/comps/Layout";
import { SubmitHandler } from "react-hook-form";
import { useZodForm, Form } from "@ui/Forms/Form";

import { setCloseModal } from "@/state/slices/uiSlice";
import { setRows } from "@/state/slices/accountSlice";
import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";

import {
  useGetAccountByIdQuery,
  usePatchAccountMutation,
} from "@/api/resources/accounts";

import { useGetUsersQuery } from "@/api/resources/accounts/users";

import {
  nameFields,
  detailFields,
  updateSchema,
  contactFields,
  UpdateFormData,
  UpdateFormKeyTypes,
} from "@schema/AccountSchema";

import StaticLoader from "@/comps/ui/Loader/StaticLoader";
import { Account } from "@/api/resources/accounts/types";
import {
  useGetStatesQuery,
  useGetCitiesQuery,
  useGetCountriesQuery,
} from "@/api/misc";

export default function EditAccountForm({ row }: TableRow) {
  const dispatch = useAppDispatch();
  const [patch, result] = usePatchAccountMutation();
  const { rows } = useAppSelector((state) => state.account);

  const form = useZodForm({
    schema: updateSchema,
  });

  const {
    data: accountdata,
    refetch: refetchAccount,
    isLoading: isAccountDataLoading,
  } = useGetAccountByIdQuery(row.id);

  const {
    data: userData,
    refetch: refetchUsers,
    isLoading: isUserDataLoading,
  } = useGetUsersQuery(accountdata?.id ?? "", {
    skip: !accountdata?.id,
  });

  const { data: countries, isLoading: isCountriesLoading } =
    useGetCountriesQuery();

  const { data: states, isLoading: isStatesLoading } = useGetStatesQuery(
    form.watch("country") ?? accountdata?.country ?? "",
    {
      skip: !accountdata?.country && !form.watch("country"),
    }
  );

  const { data: cities, isLoading: isCitiesLoading } = useGetCitiesQuery(
    {
      state: form.watch("state") ?? accountdata?.state ?? "",
      country: form.watch("country") ?? accountdata?.country ?? "",
    },
    {
      skip: !accountdata?.state && !form.watch("state"),
    }
  );

  const getField = (field: AccountField) => {
    if (process.env.DEVELOPMENT_MODE === "mock") {
      return row[field];
    } else {
      return accountdata && field in accountdata
        ? accountdata[field]
        : userData?.[0] && field in userData[0]
        ? userData[0][field as unknown as keyof (typeof userData)[0]]
        : "";
    }
  };

  const onSubmit: SubmitHandler<UpdateFormData> = async (updatedData) => {
    try {
      const res = await patch({
        id: process.env.DEVELOPMENT_MODE === "mock" ? row.id : accountdata?.id,
        city: updatedData.city,
        state: updatedData.state,
        name: updatedData.account_ID,
        country: updatedData.country,
        users: [
          {
            city: updatedData.city,
            email: updatedData.email,
            state: updatedData.state,
            country: updatedData.country,
            login_id: updatedData.login_id,
            first_name: updatedData.first_name,
            last_name: updatedData.last_name ?? "",
            id:
              process.env.DEVELOPMENT_MODE === "mock"
                ? row.id
                : (userData && userData[0]?.id) ?? "",
          },
        ],
      }).unwrap();

      refetchAccount();
      refetchUsers();

      dispatch(setRows(rows.map((row) => (row.name === res.name ? res : row))));

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

  type AccountField = keyof Omit<
    Account,
    "id" | "status" | "organization_units" | "users"
  >;

  if (process.env.DEVELOPMENT_MODE !== "mock") {
    if (
      isCitiesLoading ||
      isStatesLoading ||
      isUserDataLoading ||
      isCountriesLoading ||
      isAccountDataLoading
    ) {
      return <StaticLoader />;
    }
  }
  const defaultCountry = countries?.find((c) => c.iso2 === row.country);
  const defaultState = states?.find((s) => s.iso2 === row.state);
  const defaultCity = cities?.find((c) => c.name === row.city);

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
                  defaultValue={accountdata?.name ?? ""}
                  {...form.register(field.name as UpdateFormKeyTypes)}
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

            <div className="px-4 py-2 w-1/2">
              <SelectInput
                registerName="state"
                label="State / Province"
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
              <>
                {field.name !== "password" && (
                  <div className="px-4 py-2 w-full md:w-1/2" key={field.name}>
                    <TextInput
                      type={field.type}
                      label={field.label}
                      required={field.required}
                      placeholder={field.placeholder}
                      autoComplete={field.autoComplete}
                      className="md:text-sm 2xl:text-base"
                      defaultValue={getField(field.name as AccountField)}
                      {...form.register(field.name as UpdateFormKeyTypes)}
                    />
                  </div>
                )}
              </>
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
                  {...form.register(field.name as UpdateFormKeyTypes)}
                  defaultValue={
                    process.env.DEVELOPMENT_MODE === "mock"
                      ? row[field.name as keyof typeof row]
                      : field.name === "first_name_2"
                      ? userData?.[0].first_name
                      : field.name === "last_name_2"
                      ? userData?.[0].last_name
                      : userData?.[0] && field.name in userData[0]
                      ? userData?.[0][
                          field.name as unknown as keyof (typeof userData)[0]
                        ]
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
              disabled={!form.formState.isDirty}
            >
              <span className="inline-flex justify-center w-full">Update</span>
            </Button>
          </div>
        </div>
      </Form>
    </Layout>
  );
}
