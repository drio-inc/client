import Button from "@ui/Button";
import { SelectInput, TextInput } from "@ui/Forms/Inputs";

import showAlert from "@ui/Alert";
import Layout from "@/comps/Layout";

import { z } from "zod";
import { SubmitHandler } from "react-hook-form";
import { useZodForm, Form } from "@ui/Forms/Form";

import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";

import { setCloseModal } from "@/state/slices/uiSlice";
import { setRuleRows } from "@/state/slices/policiesSlice";
import { useAddRuleMutation } from "@/api/resources/policies";

const schema = z.object({
  default_allow: z.boolean({
    required_error: "Please select an option",
  }),

  dataset: z.string({
    required_error: "Please select a dataset",
  }),

  name: z.string().nonempty("Please Enter a value"),

  metadata: z.string({
    required_error: "Please select metadata",
  }),

  conditions: z.string().nonempty("Please Enter a value"),

  value: z.string({
    required_error: "Please select a value",
  }),

  subrule: z.string().nonempty("Please Enter a value"),

  action: z.string({
    required_error: "Please select an action",
  }),
});

type FormData = z.infer<typeof schema>;

export default function AddNewRuleForm() {
  const dispatch = useAppDispatch();
  const [addRule, result] = useAddRuleMutation();
  const policyState = useAppSelector((state) => state.policies);

  const form = useZodForm({
    schema: schema,
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const res = await addRule({
        ...data,
      }).unwrap();

      dispatch(setRuleRows([...policyState.ruleRows, res]));

      showAlert("Rule added successfully", "success");
    } catch (err: any) {
      showAlert(
        err?.data?.message ?? "Something went wrong. Please try again.",
        "error"
      );
    }

    form.reset();
    dispatch(setCloseModal("addNewRuleForm"));
  };

  return (
    <Layout>
      <Form form={form} onSubmit={onSubmit}>
        <div className="mx-auto bg-white p-6 rounded-lg max-w-[60vw]">
          <h2 className="text-gray-700 text-2xl font-bold">Policy Rules</h2>

          <div className="flex flex-wrap -m-2 rounded-lg my-4 border bg-gray-50">
            <div className="px-4 py-2 w-1/2">
              <SelectInput
                placeholder={"Select"}
                label={"Default Allow"}
                registerName="default_allow"
                className="md:text-sm 2xl:text-base"
                options={[
                  { label: "True", value: true },
                  { label: "False", value: false },
                ]}
              />
            </div>

            <div className="px-4 py-2 w-1/2">
              <SelectInput
                placeholder={"Select"}
                registerName="dataset"
                label={"Select Dataset"}
                className="md:text-sm 2xl:text-base"
                options={[
                  { label: "MKT Data", value: "mkt_data" },
                  { label: "Accidents", value: "accidents" },
                  { label: "Dealer Sales", value: "dealer_sales" },
                ]}
              />
            </div>

            <div className="px-4 py-2 w-1/2">
              <TextInput
                label={"Rule Name"}
                {...form.register("name")}
                placeholder={"Enter rule name"}
                className="md:text-sm 2xl:text-base"
              />
            </div>

            <div className="px-4 py-2 w-1/2">
              <SelectInput
                placeholder={"Select"}
                registerName="metadata"
                label={"Select Metadata"}
                className="md:text-sm 2xl:text-base"
                options={[
                  { label: "User Location", value: "user_location" },
                  { label: "Request", value: "Request Location" },
                ]}
              />
            </div>

            <div className="px-4 py-2 w-1/2">
              <TextInput
                label={"Conditions"}
                placeholder={"Add conditions"}
                {...form.register("conditions")}
                className="md:text-sm 2xl:text-base"
              />
            </div>

            <div className="px-4 py-2 w-1/2">
              <SelectInput
                placeholder={"Select"}
                registerName="value"
                label={"Select Value"}
                className="md:text-sm 2xl:text-base"
                options={[
                  { label: "Equal", value: "=" },
                  { label: "<", value: "<" },
                  { label: "Regex", value: "regex" },
                ]}
              />
            </div>

            <div className="px-4 py-2 w-1/2">
              <TextInput
                label={"Add Subrule"}
                placeholder={"Add subrule"}
                {...form.register("subrule")}
                className="md:text-sm 2xl:text-base"
              />
            </div>

            <div className="px-4 py-2 w-1/2">
              <SelectInput
                placeholder={"Select"}
                registerName="action"
                label={"Add Action"}
                className="md:text-sm 2xl:text-base"
                options={[
                  { label: "Allow", value: "allow" },
                  { label: "Deny", value: "deny" },
                  { label: "Mask", value: "mask" },
                ]}
              />
            </div>
          </div>

          <div className="px-2 py-2 flex gap-4 justify-end mt-4">
            <Button
              type="button"
              intent={`secondary`}
              onClick={() => dispatch(setCloseModal("addNewRuleForm"))}
            >
              <span className="inline-flex justify-center w-full">Cancel</span>
            </Button>

            <Button intent={`primary`} isLoading={result.isLoading}>
              <span className="inline-flex justify-center w-full">Save</span>
            </Button>
          </div>
        </div>
      </Form>
    </Layout>
  );
}
