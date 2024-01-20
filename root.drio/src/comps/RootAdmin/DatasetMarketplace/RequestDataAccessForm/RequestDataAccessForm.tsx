import Button from "@ui/Button";
import { SelectInput, TextInput } from "@ui/Forms/Inputs";

import showAlert from "@ui/Alert";
import Layout from "@/comps/Layout";

import { z } from "zod";
import { SubmitHandler } from "react-hook-form";
import { useZodForm, Form } from "@ui/Forms/Form";

import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";

import { setCloseModal } from "@/state/slices/uiSlice";
import { useRequestDataAccessMutation } from "@/api/resources/subscribe-datasets";

const schema = z.object({
  ou: z.string({
    required_error: "Please select an option",
  }),

  server_address: z.string().nonempty("Please Enter a value"),

  persona: z.string({
    required_error: "Please select an option",
  }),

  address: z.string().nonempty("Please Enter a value"),
  phone_number: z.string().nonempty("Please Enter a value"),
  requestor_info: z.string().nonempty("Please Enter a value"),
  contact_person: z.string().nonempty("Please Enter a value"),
  email: z.string().nonempty("Please Enter a value").email("Invalid email"),
});

type FormData = z.infer<typeof schema>;

export default function RequestDataAccessForm({ row }: TableRow) {
  const dispatch = useAppDispatch();
  const [requestAccess, result] = useRequestDataAccessMutation();
  const orgUnitState = useAppSelector((state) => state.orgUnit);

  const form = useZodForm({
    schema: schema,
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const res = await requestAccess({
        ...data,
      }).unwrap();

      showAlert("Request sent successfully", "success");
    } catch (err: any) {
      showAlert(
        err?.data?.message ?? "Something went wrong. Please try again.",
        "error"
      );
    }

    form.reset();
    dispatch(setCloseModal("requestDataAccessForm"));
  };

  return (
    <Layout>
      <Form form={form} onSubmit={onSubmit}>
        <div className="mx-auto bg-white p-6 rounded-lg max-w-[60vw]">
          <h2 className="text-gray-700 text-2xl font-bold">
            Request Data Access
          </h2>

          <div className="flex flex-wrap -m-2 rounded-lg my-4 border bg-gray-50">
            <div className="px-4 py-2 w-1/2">
              <SelectInput
                placeholder={"Select"}
                label={"From Organization"}
                registerName="ou"
                className="md:text-sm 2xl:text-base"
                options={
                  orgUnitState?.rows?.map((row) => ({
                    label: row?.ou ?? "",
                    value: row?.ou?.toLowerCase().replace(/\s/g, "") ?? "",
                  })) ?? []
                }
              />
            </div>

            <div className="px-4 py-2 w-1/2">
              <TextInput
                label={"Server Address"}
                {...form.register("server_address")}
                placeholder={"Enter server address"}
                className="md:text-sm 2xl:text-base"
              />
            </div>

            <div className="px-4 py-2 w-1/2">
              <SelectInput
                placeholder={"Select"}
                registerName="persona"
                label={"Select Persona"}
                className="md:text-sm 2xl:text-base"
                options={[
                  { label: "Finance", value: "finance" },
                  { label: "Vehicle", value: "vehicle" },
                  {
                    label: "Marketing",
                    value: "marketing",
                  },
                ]}
              />
            </div>
          </div>

          <div className="flex flex-wrap -m-2 rounded-lg my-4 border bg-gray-50">
            <div className="px-4 py-2 w-1/2">
              <TextInput
                label={"Requestor Info"}
                placeholder={"Enter info"}
                {...form.register("requestor_info")}
                className="md:text-sm 2xl:text-base"
              />
            </div>

            <div className="px-4 py-2 w-1/2"></div>

            <div className="px-4 py-2 w-1/2">
              <TextInput
                label={"Contact Person"}
                placeholder={"Enter name"}
                {...form.register("contact_person")}
                className="md:text-sm 2xl:text-base"
              />
            </div>

            <div className="px-4 py-2 w-1/2">
              <TextInput
                label={"Work Phone Number"}
                {...form.register("phone_number")}
                className="md:text-sm 2xl:text-base"
                placeholder={"Enter your work phone number"}
              />
            </div>

            <div className="px-4 py-2 w-1/2">
              <TextInput
                label={"Email"}
                {...form.register("email")}
                className="md:text-sm 2xl:text-base"
                placeholder={"Enter your business email"}
              />
            </div>

            <div className="px-4 py-2 w-1/2">
              <TextInput
                label={"Address"}
                {...form.register("address")}
                className="md:text-sm 2xl:text-base"
                placeholder={"Enter your office address"}
              />
            </div>
          </div>

          <div className="px-2 py-2 flex gap-4 justify-end mt-4">
            <Button
              type="button"
              intent={`secondary`}
              onClick={() => dispatch(setCloseModal("requestDataAccessForm"))}
            >
              <span className="inline-flex justify-center w-full">Cancel</span>
            </Button>

            <Button intent={`primary`} isLoading={result.isLoading}>
              <span className="inline-flex justify-center w-full">Request</span>
            </Button>
          </div>
        </div>
      </Form>
    </Layout>
  );
}
