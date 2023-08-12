import Button from "@ui/Button";
import { SelectInput, TextInput } from "@ui/Forms/Inputs";
import { Country, State, City } from "country-state-city";

import showAlert from "@ui/Alert";
import Layout from "@/comps/Layout";

import { z } from "zod";
import { SubmitHandler } from "react-hook-form";
import { useZodForm, Form } from "@ui/Forms/Form";
import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";

import { useEditAccountMutation } from "@/api/resources/accounts";
import { setCloseModal } from "@/state/slices/uiSlice";
import { setRows } from "@/state/slices/accountSlice";

const schema = z.object({
  account: z.string().nonempty("Please Enter a value"),
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

export default function EditAccountForm({ row }: TableRow) {
  const dispatch = useAppDispatch();
  const [editAccount, result] = useEditAccountMutation();
  const adminAccountState = useAppSelector((state) => state.account);

  const form = useZodForm({
    schema: schema,
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const res = await editAccount({
        ...data,
        id: row.id,
      }).unwrap();

      dispatch(
        setRows(
          adminAccountState.rows.map((row) => (row.id === res.id ? res : row))
        )
      );

      dispatch(setCloseModal("editAccountForm"));
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
        <div className="w-full mx-auto bg-white p-8 rounded-lg">
          <h2 className="text-gray-700 text-2xl font-bold mb-4">
            Edit Account
          </h2>
          <div className="flex flex-wrap -m-2 shadow-md p-2 rounded-lg bg-gray-50">
            <div className="px-4 py-2 w-full">
              <div className="relative">
                <TextInput
                  label="Account"
                  defaultValue={row.account}
                  {...form.register("account")}
                  placeholder="Enter your account"
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
          <div className="py-2 flex justify-center md:justify-end w-full mt-4">
            <Button
              type="button"
              intent={`secondary`}
              onClick={() => dispatch(setCloseModal("editAccountForm"))}
              className="w-full md:w-auto mr-2 md:mr-6"
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
