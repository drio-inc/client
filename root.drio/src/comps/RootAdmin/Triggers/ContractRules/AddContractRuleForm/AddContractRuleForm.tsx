import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import { Form, useZodForm } from "@/comps/ui/Forms/Form";
import { SelectInput, TextInput } from "@/comps/ui/Forms/Inputs";
import { setRows, setRuleRows } from "@/state/slices/contractRuleSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

import Button from "@/comps/ui/Button";
import showAlert from "@/comps/ui/Alert";
import ContractRulesTable from "../RulesTable";
import { transformContractRules } from "@/functions/flattenRules";
import AddTriggerActionForm from "../../TriggerActions/AddTriggerActionForm";
import Modal from "@/comps/ui/Modal";

const contractRuleSchema = z.object({
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

type FormData = z.infer<typeof contractRuleSchema>;

const AddContractRuleForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const { rows, ruleRows } = useAppSelector((state) => state.contractRule);

  const form = useZodForm({
    schema: contractRuleSchema,
  });

  const onSubmit = async (data: FormData) => {
    dispatch(
      setRows([
        ...rows,
        {
          ...data,
          id: uuidv4(),
          scope: "global",
          rules: ruleRows,
          createdBy: auth.user?.username ?? "admin",
          modifiedBy: auth.user?.username ?? "admin",
          dateCreated: new Date().toISOString().slice(0, 10),
          dateLastModified: new Date().toISOString().slice(0, 10),
        },
      ])
    );

    showAlert("Contract added successfully", "success");
    dispatch(setRuleRows([]));
    router.push("/triggers/contract-rules");
  };

  return (
    <div className="w-full">
      <div className={"flex flex-col w-full shadow-lg rounded-lg bg-white"}>
        <div className="p-4 bg-gray-50 rounded-lg">
          <h2 className="text-gray-700 text-2xl font-bold">Add New Contract Rule</h2>
        </div>

        <Form form={form} onSubmit={onSubmit} className="w-full mb-4">
          <div className="flex flex-col flex-wrap w-full">
            <div className="flex flex-wrap w-4/5">
              <div className="px-4 py-2 w-full md:w-1/2 xl:w-1/3">
                <TextInput
                  label={"Name"}
                  placeholder={"Contract name"}
                  {...form.register("name")}
                  className="md:text-sm 2xl:text-base"
                />
              </div>

              <div className="px-4 py-2 w-full md:w-1/2 xl:w-1/3">
                <SelectInput
                  label="For Contract"
                  registerName="contract"
                  placeholder="Select contract"
                  defaultSelectedValue={{ label: "All", value: "all" }}
                  options={[
                    { label: "All", value: "all" },
                    { label: "UPS", value: "ups" },
                    { label: "DHL", value: "dhl" },
                    { label: "Xtime", value: "xtime" },
                    { label: "Kintetsu", value: "kintetsu" },
                    { label: "kbb", value: "Kelly Blue Book" },
                    { label: "Wells Fargo", value: "wells_fargo" },
                    { label: "Market Analytics", value: "market_analytics" },
                  ]}
                />
              </div>
            </div>

            <div className="flex flex-wrap w-4/5">
              <div className="px-4 py-2 w-full md:w-1/2 xl:w-1/3">
                <SelectInput
                  label="Type"
                  registerName="type"
                  placeholder="Select type"
                  options={[
                    { label: "Privacy", value: "privacy" },
                    { label: "Security", value: "security" },
                    { label: "Regulatory", value: "regulatory" },
                    { label: "Contractual", value: "contractual" },
                  ]}
                />
              </div>

              <div className="px-4 py-2 w-full md:w-1/2 xl:w-1/3">
                <SelectInput
                  label="Persona"
                  registerName="persona"
                  placeholder="Select persona"
                  options={[
                    { label: "Fraud", value: "fraud" },
                    { label: "Logistics", value: "logistics" },
                    { label: "Financial", value: "financial" },
                    { label: "Marketing", value: "marketing" },
                    { label: "Fin Compliance", value: "fin_compliance" },
                  ]}
                />
              </div>
            </div>
          </div>
        </Form>

        <ContractRulesTable rows={transformContractRules(ruleRows)} />
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
        <Button intent={"primary"} onClick={form?.handleSubmit(onSubmit)}>
          Save Contract Rule
        </Button>
      </div>

      <Modal identifier="addTriggerActionForm">
        <AddTriggerActionForm />
      </Modal>
    </div>
  );
};

export default AddContractRuleForm;
