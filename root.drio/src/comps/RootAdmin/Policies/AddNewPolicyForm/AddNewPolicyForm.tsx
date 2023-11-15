import { z } from "zod";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";
import { setRows, setRuleRows } from "@/state/slices/policiesSlice";
import { useRouter } from "next/router";
import { Form, useZodForm } from "@/comps/ui/Forms/Form";
import { SelectInput, TextInput } from "@/comps/ui/Forms/Inputs";

import showAlert from "@/comps/ui/Alert";
import PolicyRules from "../PolicyRules/PolicyRules";
import { useAddPolicyMutation } from "@/api/resources/policies";
import Button from "@/comps/ui/Button";

const policySchema = z.object({
  name: z.string().nonempty("Please Enter a value"),

  type: z.string({
    required_error: "Please select a type",
  }),

  contract: z.string({
    required_error: "Please select a contract",
  }),

  persona: z.string({
    required_error: "Please select a persona",
  }),
});

type FormData = z.infer<typeof policySchema>;

const AddNewPolicyForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [addPolicy, result] = useAddPolicyMutation();
  const auth = useAppSelector((state) => state.auth);
  const policies = useAppSelector((state) => state.policies);
  const form = useZodForm({
    schema: policySchema,
  });

  const onSubmit = async (data: FormData) => {
    console.log("data", data, policies.ruleRows);

    dispatch(
      setRows([
        ...policies.rows,
        {
          ...data,
          scope: "global",
          rules: policies.ruleRows,
          createdBy: auth.user?.username ?? "admin",
          modifiedBy: auth.user?.username ?? "admin",
          dateCreated: new Date().toISOString().slice(0, 10),
          dateLastModified: new Date().toISOString().slice(0, 10),
        },
      ])
    );

    showAlert("Policy added successfully", "success");
    dispatch(setRuleRows([]));
    router.push("/policies");

    // try {
    //   const res = await addPolicy({
    //     ...data,
    //   }).unwrap();
    //   dispatch(setRows([res]));
    //   showAlert("Policy added successfully", "success");
    // } catch (err: any) {
    //   showAlert(
    //     err?.data?.message ?? "Something went wrong. Please try again.",
    //     "error"
    //   );
    // }
  };

  return (
    <div className="w-full">
      <div className={"flex flex-col w-full shadow-lg rounded-lg bg-white"}>
        <div className="p-4 bg-gray-50 rounded-lg">
          <h2 className="text-gray-700 text-2xl font-bold">Add New Policy</h2>
        </div>

        <Form form={form} onSubmit={onSubmit} className="w-full mb-4">
          <div className="flex flex-col flex-wrap w-full">
            <div className="flex flex-wrap ml-8 w-4/5">
              <div className="px-4 py-2 w-full md:w-1/2 xl:w-1/3">
                <TextInput
                  label={"Name"}
                  placeholder={"Policy name"}
                  {...form.register("name")}
                  className="md:text-sm 2xl:text-base"
                />
              </div>

              <div className="px-4 py-2 w-full md:w-1/2 xl:w-1/3">
                <SelectInput
                  label="For Contract"
                  registerName="contract"
                  placeholder="Select contract"
                  options={[
                    { label: "Contract 1", value: "contract1" },
                    { label: "Contract 2", value: "contract2" },
                  ]}
                />
              </div>
            </div>

            <div className="flex flex-wrap ml-8 w-4/5">
              <div className="px-4 py-2 w-full md:w-1/2 xl:w-1/3">
                <SelectInput
                  label="Type"
                  registerName="type"
                  placeholder="Select type"
                  options={[
                    { label: "Privacy", value: "privacy" },
                    { label: "Security", value: "security" },
                    { label: "Regulatory", value: "regulatory" },
                  ]}
                />
              </div>

              <div className="px-4 py-2 w-full md:w-1/2 xl:w-1/3">
                <SelectInput
                  label="Persona"
                  registerName="persona"
                  placeholder="Select persona"
                  options={[
                    { label: "Persona 1", value: "persona1" },
                    { label: "Persona 2", value: "persona2" },
                  ]}
                />
              </div>
            </div>
          </div>
        </Form>

        <PolicyRules />
      </div>

      <div className="flex mt-8">
        <Button
          intent={"primary"}
          className="mx-auto"
          onClick={form?.handleSubmit(onSubmit)}
        >
          Save Policy
        </Button>
      </div>
    </div>
  );
};

export default AddNewPolicyForm;
