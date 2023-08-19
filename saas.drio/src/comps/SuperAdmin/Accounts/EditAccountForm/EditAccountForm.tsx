import Button from "@ui/Button";
import { SelectInput, TextInput } from "@ui/Forms/Inputs";
import { Country, State, City } from "country-state-city";

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
  useUpdateAccountMutation,
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

export default function EditAccountForm({ row }: TableRow) {
  const dispatch = useAppDispatch();
  const [patch, result] = usePatchAccountMutation();
  const { rows } = useAppSelector((state) => state.account);

  const {
    data: accountdata,
    error: accountError,
    refetch: refetchAccount,
    isLoading: isAccountDataLoading,
  } = useGetAccountByIdQuery(row.id);

  const {
    data: userData,
    error: usersError,
    refetch: refetchUsers,
    isLoading: isUserDataLoading,
  } = useGetUsersQuery(accountdata?.id ?? "", {
    skip: !accountdata?.id,
  });

  const form = useZodForm({
    schema: updateSchema,
  });

  const defaultCountry = Country.getAllCountries().find(
    (c) => c.isoCode === accountdata?.country
  );

  const defaultState = State.getStatesOfCountry(
    accountdata?.country ?? ""
  ).find((s) => s.isoCode === accountdata?.state);

  const defaultCity = City.getCitiesOfState(
    accountdata?.country ?? "",
    accountdata?.state ?? ""
  ).find((c) => c.name === accountdata?.city);

  const onSubmit: SubmitHandler<UpdateFormData> = async (updatedData) => {
    try {
      const res = await patch({
        id: accountdata?.id,
        name: updatedData.name,
        country: updatedData.country,
        state: updatedData.state,
        city: updatedData.city,
        users: [
          {
            city: updatedData.city,
            email: updatedData.email,
            state: updatedData.state,
            country: updatedData.country,
            login_id: updatedData.login_id,
            first_name: updatedData.first_name,
            last_name: updatedData.last_name ?? "",
            id: (userData && userData[0]?.id) ?? "",
          },
        ],
      }).unwrap();

      refetchAccount();
      refetchUsers();

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

  type AccountField = keyof Omit<
    Account,
    "id" | "status" | "organization_units" | "users"
  >;

  if (isAccountDataLoading) return <StaticLoader />;

  if (isUserDataLoading) return <StaticLoader />;

  if (!userData) return <StaticLoader />;

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
                  {...form.register(field.name as UpdateFormKeyTypes)}
                  defaultValue={
                    accountdata && field.name in accountdata
                      ? accountdata[field.name as AccountField]
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
                    form.watch("country") ?? accountdata?.country ?? ""
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
                    form.watch("country") ?? accountdata?.country ?? "",
                    form.watch("state") ?? accountdata?.state ?? ""
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
                      defaultValue={
                        userData[0] && field.name in userData[0]
                          ? userData[0][
                              field.name as unknown as keyof (typeof userData)[0]
                            ]
                          : ""
                      }
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
                    field.name === "first_name_2"
                      ? userData[0].first_name
                      : field.name === "last_name_2"
                      ? userData[0].last_name
                      : userData[0] && field.name in userData[0]
                      ? userData[0][
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
