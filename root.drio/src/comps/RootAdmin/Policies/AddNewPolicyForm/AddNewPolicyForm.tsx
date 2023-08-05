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
import { SelectInput, TextInput } from "@/comps/ui/Forms/Inputs";
import Image from "next/image";

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
              options={[]}
            />
          </div>

          <div className="px-4 py-2 w-1/4">
            <SelectInput
              label="For Contract"
              registerName="contract"
              placeholder="Select contract"
              options={[]}
            />
          </div>

          <div className="px-4 py-2 w-1/4">
            <SelectInput
              label="Persona"
              registerName="persona"
              placeholder="Select persona"
              options={[]}
            />
          </div>
        </div>
        <div className="px-4 py-2 flex">
          <Button intent={"primary"} className="ml-auto">
            Save Policy
          </Button>
        </div>
      </Form>

      <div
        className={`bg-gray-50 px-4 py-3 flex flex-wrap items-center justify-between border-t pt-16`}
      >
        <h2 className="text-gray-700 text-2xl font-bold">Service Record</h2>

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

      <div className="w-full flex justify-around">
        {headers?.map((header, index) => (
          <div
            key={index}
            className={"font-medium uppercase text-gray-500 text-sm p-4"}
          >
            {header.header}
          </div>
        ))}
      </div>

      <div className="relative bg-gradient-to-t from-gray-100">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="border-t border-b p-4 h-[64px]" />
        ))}

        <Image
          width={50}
          height={50}
          alt="empty"
          src="/document.svg"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white"
        />
      </div>

      {/* <Table
        noSelection
        headers={headers}
        rows={policiesState.rows}
        selectedRows={policiesState.selectedRows}
      /> */}
    </div>
  );
};

export default AddNewPolicyForm;
