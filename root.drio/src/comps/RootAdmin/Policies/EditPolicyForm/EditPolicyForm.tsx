import { z } from "zod";
import { useRouter } from "next/router";
import { Form, useZodForm } from "@/comps/ui/Forms/Form";
import { SelectInput, TextInput } from "@/comps/ui/Forms/Inputs";
import { setRows, setRuleRows } from "@/state/slices/policiesSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

import Button from "@/comps/ui/Button";
import showAlert from "@/comps/ui/Alert";
import PolicyRulesTable from "../RulesTable";

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

const contractOptions = [
  { label: "Contract 1", value: "contract1" },
  { label: "Contract 2", value: "contract2" },
];

const typeOptions = [
  { label: "Privacy", value: "privacy" },
  { label: "Security", value: "security" },
  { label: "Regulatory", value: "regulatory" },
];

const personaOptions = [
  { label: "Persona 1", value: "persona1" },
  { label: "Persona 2", value: "persona2" },
];

const EditPolicyForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const row = router?.query?.row as string;
  const parsedRow = (row && JSON.parse(row)) ?? "";
  const { rows, ruleRows } = useAppSelector((state) => state.policies);

  const form = useZodForm({
    schema: policySchema,
  });

  const onSubmit = async (data: FormData) => {
    const policyToUpdate = rows.find((policy) => policy.id === parsedRow.id);
    const updatedPolicies = rows.filter((policy) => policy.id !== parsedRow.id);

    dispatch(
      setRows([
        ...updatedPolicies,
        {
          ...policyToUpdate,
          ...data,
          rules: [...ruleRows],
          dateLastModified: new Date().toISOString().slice(0, 10),
        },
      ])
    );

    showAlert("Policy updated successfully", "success");
    dispatch(setRuleRows([]));
    router.push("/policies");
  };

  return (
    <div className="w-full">
      <div className={"flex flex-col w-full shadow-lg rounded-lg bg-white"}>
        <div className="p-4 bg-gray-50 rounded-lg">
          <h2 className="text-gray-700 text-2xl font-bold">Edit Policy</h2>
        </div>

        <Form form={form} onSubmit={onSubmit} className="w-full mb-4">
          <div className="flex flex-col flex-wrap w-full">
            <div className="flex flex-wrap ml-8 w-4/5">
              <div className="px-4 py-2 w-full md:w-1/2 xl:w-1/3">
                <TextInput
                  label={"Name"}
                  {...form.register("name")}
                  placeholder={"Policy name"}
                  defaultValue={parsedRow.name}
                  className="md:text-sm 2xl:text-base"
                />
              </div>

              <div className="px-4 py-2 w-full md:w-1/2 xl:w-1/3">
                <SelectInput
                  label="For Contract"
                  registerName="contract"
                  options={contractOptions}
                  placeholder="Select contract"
                  defaultSelectedValue={
                    contractOptions.find(
                      (option) => option.value === parsedRow.contract
                    ) ?? { label: "", value: "" }
                  }
                />
              </div>
            </div>

            <div className="flex flex-wrap ml-8 w-4/5">
              <div className="px-4 py-2 w-full md:w-1/2 xl:w-1/3">
                <SelectInput
                  label="Type"
                  registerName="type"
                  options={typeOptions}
                  placeholder="Select type"
                  defaultSelectedValue={
                    typeOptions.find(
                      (option) => option.value === parsedRow.type
                    ) ?? {
                      label: "",
                      value: "",
                    }
                  }
                />
              </div>

              <div className="px-4 py-2 w-full md:w-1/2 xl:w-1/3">
                <SelectInput
                  label="Persona"
                  registerName="persona"
                  options={personaOptions}
                  placeholder="Select persona"
                  defaultSelectedValue={
                    personaOptions.find(
                      (option) => option.value === parsedRow.persona
                    ) ?? { label: "", value: "" }
                  }
                />
              </div>
            </div>
          </div>
        </Form>

        <PolicyRulesTable rows={ruleRows} editable />
      </div>

      <div className="flex mt-8 justify-center gap-x-4">
        <Button
          intent={"primaryOutline"}
          onClick={() => {
            router.back();
            dispatch(setRuleRows([]));
          }}
        >
          Cancel
        </Button>
        <Button
          intent={"primary"}
          className=""
          onClick={form?.handleSubmit(onSubmit)}
        >
          Save Policy
        </Button>
      </div>
    </div>
  );
};

export default EditPolicyForm;
