import Button from "@ui/Button";
import { SelectInput, TextInput } from "@ui/Forms/Inputs";
import { Country, State, City } from "country-state-city";

import showAlert from "@ui/Alert";
import Layout from "@/comps/Layout";
import { useRouter } from "next/router";

import { z } from "zod";
import { SubmitHandler } from "react-hook-form";
import { useZodForm, Form } from "@ui/Forms/Form";

import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";

import { setCloseModal } from "@/state/slices/uiSlice";
import { setRows } from "@/state/slices/adminAccountSlice";
import { useAddAccountMutation } from "@/state/services/apiService";

const nameFields = [
  {
    name: "name",
    label: "Account Name*",
    type: "text",
    placeholder: "Enter account name",
  },
  {
    name: "streetAddress",
    label: "Street address",
    type: "text",
    placeholder: "Enter your street address",
  },
];

const detailFields = [
  {
    name: "rootAdminFirstName",
    label: "Root Admin First Name",
    type: "text",
    placeholder: "Enter root admin first name",
  },
  {
    name: "rootAdminLastName",
    label: "Root Admin Last Name",
    type: "text",
    placeholder: "Enter root admin last name",
  },
  {
    name: "rootAdminID",
    label: "Root Admin ID",
    type: "text",
    placeholder: "Enter your ID",
  },
  {
    name: "rootAdminInitialPassword",
    label: "Root Admin Initial Password",
    type: "password",
    placeholder: "Enter root admin password",
  },
];

const contactFields = [
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    placeholder: "First name",
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "text",
    placeholder: "Last name",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
  },
  {
    name: "contactNumber",
    label: "Contact Number",
    type: "text",
    placeholder: "Enter your number",
  },
];

const schema = z.object({
  name: z.string().nonempty("Please Enter a value"),
  streetAddress: z.string().nonempty("Please Enter a value"),
  country: z.string({
    required_error: "Please Enter a value",
  }),
  state: z.string({
    required_error: "Please Enter a value",
  }),
  city: z
    .string({
      required_error: "Please Enter a value",
    })
    .optional(),
  zipCode: z.string().nonempty("Please Enter a value"),
  description: z.string().nonempty("Please Enter a value"),

  rootAdminFirstName: z.string().nonempty("Please Enter a value"),
  rootAdminLastName: z.string().nonempty("Please Enter a value"),
  rootAdminID: z.string().nonempty("Please Enter a value"),
  rootAdminInitialPassword: z.string().nonempty("Please Enter a value"),

  firstName: z.string().nonempty("Please Enter a value"),
  lastName: z.string().nonempty("Please Enter a value"),
  email: z.string().nonempty("Please Enter a value"),
  contactNumber: z.string().nonempty("Please Enter a value"),
});

type FormData = z.infer<typeof schema>;
type FormKeyTypes = keyof FormData;

export default function AddAccountForm() {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const [addAccount, result] = useAddAccountMutation();
  const { rows } = useAppSelector((state) => state.adminAccount);

  const form = useZodForm({
    schema: schema,
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const res = await addAccount({
        ...data,
      }).unwrap();

      dispatch(setRows([...rows, res]));
      showAlert("Account added successfully", "success");
    } catch (err: any) {
      showAlert(
        err?.data?.message ?? "Something went wrong. Please try again.",
        "error"
      );
    }

    form.reset();
    dispatch(setCloseModal("addAccountForm"));
  };

  return (
    <Layout>
      <Form
        form={form}
        onSubmit={onSubmit}
        className="min-w-full overflow-auto"
      >
        <div className="w-full mx-auto bg-white p-8 rounded-lg">
          <h2 className="text-gray-700 text-2xl font-bold my-4">
            Account Information
          </h2>

          <div className="flex flex-wrap -m-2 shadow-md p-2 rounded-lg bg-gray-50 my-4">
            {nameFields.map((field) => (
              <div className="px-4 py-2 w-full" key={field.name}>
                <TextInput
                  type={field.type}
                  label={field.label}
                  placeholder={field.placeholder}
                  className="md:text-sm 2xl:text-base"
                  {...form.register(field.name as FormKeyTypes)}
                />
              </div>
            ))}

            <div className="px-4 py-2 w-1/2">
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

            <div className="px-4 py-2 w-1/2">
              <SelectInput
                label="State / Province"
                registerName="state"
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

          <h2 className="text-gray-700 text-sm my-2">Account Details</h2>

          <div className="flex flex-wrap -m-2 shadow-md p-2 rounded-lg bg-gray-50 my-4">
            {detailFields.map((field) => (
              <div className="px-4 py-2 w-full md:w-1/2" key={field.name}>
                <TextInput
                  type={field.type}
                  label={field.label}
                  placeholder={field.placeholder}
                  className="md:text-sm 2xl:text-base"
                  {...form.register(field.name as FormKeyTypes)}
                />
              </div>
            ))}
          </div>

          <h2 className="text-gray-700 text-sm my-2">
            Primary Contact Information
          </h2>

          <div className="flex flex-wrap -m-2 shadow-md p-2 rounded-lg bg-gray-50 my-4">
            {contactFields.map((field) => (
              <div className="px-4 py-2 w-full md:w-1/2" key={field.name}>
                <TextInput
                  type={field.type}
                  label={field.label}
                  placeholder={field.placeholder}
                  className="md:text-sm 2xl:text-base"
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
