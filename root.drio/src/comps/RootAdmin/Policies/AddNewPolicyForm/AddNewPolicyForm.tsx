import { z } from "zod";
import Table from "@/comps/ui/Table";

import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";
import { setRows, setSelectedRows } from "@/state/slices/policiesSlice";

import Button from "@/comps/ui/Button";
import { HiPlus } from "react-icons/hi";
import { setOpenModal } from "@/state/slices/uiSlice";

import Image from "next/image";
import Modal from "@/comps/ui/Modal";
import { useRouter } from "next/router";
import AddNewRuleForm from "../PolicyRules/AddNewRuleForm";
import { Form, useZodForm } from "@/comps/ui/Forms/Form";
import StaticLoader from "@/comps/ui/Loader/StaticLoader";
import { useGetPoliciesQuery } from "@/api/resources/policies";
import { SelectInput, TextInput } from "@/comps/ui/Forms/Inputs";

import { useAddPolicyMutation } from "@/api/resources/policies";
import showAlert from "@/comps/ui/Alert";
import PolicyRules from "../PolicyRules/PolicyRules";

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

const headers = [
  {
    header: "Rule Name",
    accessor: "name",
  },
  {
    header: "Metadata Attribute",
    accessor: "metadata",
  },

  {
    header: "Conditions",
    accessor: "conditions",
  },
  {
    header: "Value",
    accessor: "value",
  },
  {
    header: "Action",
    accessor: "action",
  },
  {
    header: "Subrule",
    accessor: "subrule",
  },
  {
    header: "Date Last Modified",
    accessor: "dateLastModified",
  },
  {
    header: "Modified By",
    accessor: "modifiedBy",
  },
];

const AddNewPolicyForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [addPolicy, result] = useAddPolicyMutation();
  const policiesState = useAppSelector((state) => state.policies);

  const form = useZodForm({
    schema: policySchema,
  });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await addPolicy({
        ...data,
      }).unwrap();

      console.log(res);

      dispatch(setRows([res]));

      console.log(policiesState.rows);

      showAlert("Policy added successfully", "success");
    } catch (err: any) {
      showAlert(
        err?.data?.message ?? "Something went wrong. Please try again.",
        "error"
      );
    }
  };

  return (
    <div className={"flex flex-col w-full shadow-lg rounded-lg bg-white"}>
      <div className="p-4 bg-gray-50 rounded-lg">
        <h2 className="text-gray-700 text-2xl font-bold">Add New Policy</h2>
      </div>

      <Form form={form} onSubmit={onSubmit} className="w-full mb-16">
        <div className="flex justify-between">
          <div className="px-4 py-2 w-1/4">
            <TextInput
              label={"Name"}
              placeholder={"Enter name"}
              {...form.register("name")}
              className="md:text-sm 2xl:text-base"
            />
          </div>

          <div className="px-4 py-2 w-1/4">
            <SelectInput
              label="Type"
              registerName="type"
              placeholder="Select type"
              options={[
                { label: "Type 1", value: "type1" },
                { label: "Type 2", value: "type2" },
              ]}
            />
          </div>

          <div className="px-4 py-2 w-1/4">
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

          <div className="px-4 py-2 w-1/4">
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
        <div className="px-4 py-2 flex">
          <Button
            intent={"primary"}
            className="ml-auto"
            isLoading={result.isLoading}
          >
            Save Policy
          </Button>
        </div>
      </Form>

      <PolicyRules />
    </div>
  );
};

export default AddNewPolicyForm;
