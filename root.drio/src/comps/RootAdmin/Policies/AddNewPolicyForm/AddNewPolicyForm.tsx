import { z } from "zod";
import Table from "@/comps/ui/Table";

import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";
import { setRows, setSelectedRows } from "@/state/slices/policiesSlice";

import Button from "@/comps/ui/Button";
import { HiPlus } from "react-icons/hi";
import { setOpenModal } from "@/state/slices/uiSlice";

import { useRouter } from "next/router";
import { Form, useZodForm } from "@/comps/ui/Forms/Form";
import StaticLoader from "@/comps/ui/Loader/StaticLoader";
import { useGetPoliciesQuery } from "@/api/resources/policies";
import { SelectInput } from "@/comps/ui/Forms/Inputs";

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
    header: "Name",
    accessor: "name",
  },
  {
    header: "Type",
    accessor: "type",
  },

  {
    header: "Scope",
    accessor: "scope",
  },
  {
    header: "Date Created",
    accessor: "dateCreated",
  },
  {
    header: "Created By",
    accessor: "createdBy",
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
  const { data, isLoading } = useGetPoliciesQuery();
  const policiesState = useAppSelector((state) => state.policies);

  const form = useZodForm({
    schema: policySchema,
  });

  if (isLoading) return <StaticLoader />;

  if (data) dispatch(setRows(data));

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <div className={"flex flex-col w-full shadow-lg rounded-lg bg-white"}>
      <Form form={form} onSubmit={onSubmit}>
        <div className="px-4 py-2 w-full">
          <SelectInput
            label="Country"
            registerName="country"
            placeholder="Select country"
            options={[]}
          />
        </div>
      </Form>

      <div
        className={`rounded-lg bg-gray-50 px-4 py-3 flex flex-wrap items-center justify-between`}
      >
        <Button
          intent={"tertiary"}
          className="ml-auto"
          onClick={() => router.push("/policies/new-policy")}
        >
          <div className="flex items-center gap-1">
            <HiPlus />
            <span className="inline-block">Add New Rule</span>
          </div>
        </Button>
      </div>

      <Table
        noSelection
        headers={headers}
        rows={policiesState.rows}
        selectedRows={policiesState.selectedRows}
      />
    </div>
  );
};

export default AddNewPolicyForm;
