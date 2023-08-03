import Table from "@/comps/ui/Table";

import { setRows, setSelectedRows } from "@/state/slices/policiesSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

import Button from "@/comps/ui/Button";
import PoliciesMenu from "./PoliciesMenu";
import { IoRefresh } from "react-icons/io5";
import * as Checkbox from "@radix-ui/react-checkbox";
import { setOpenModal } from "@/state/slices/uiSlice";
import { HiMinusSm, HiPlus, HiUpload } from "react-icons/hi";
import { useRouter } from "next/router";
import { useGetPoliciesQuery } from "@/api/resources/policies";
import StaticLoader from "@/comps/ui/Loader/StaticLoader";

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

const Policies = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetPoliciesQuery();
  const policiesState = useAppSelector((state) => state.policies);

  if (isLoading) return <StaticLoader />;

  if (data) dispatch(setRows(data));

  const handleCheckbox = (index: number) => {
    if (policiesState.selectedRows.includes(index)) {
      dispatch(
        setSelectedRows(
          policiesState.selectedRows.filter((row) => row !== index)
        )
      );
    } else {
      dispatch(setSelectedRows([...policiesState.selectedRows, index]));
    }
  };

  const clearSelectedRows = () => {
    dispatch(setSelectedRows([]));
  };

  return (
    <div className="w-full">
      <div className={"flex flex-col w-full shadow-lg rounded-lg bg-white"}>
        <div
          className={`rounded-lg bg-gray-50 px-4 py-3 flex flex-wrap items-center justify-between`}
        >
          {policiesState.selectedRows.length > 0 && (
            <div className="flex items-center">
              <Checkbox.Root
                className="mr-3 flex h-4 w-4 appearance-none items-center justify-center rounded bg-white data-[state=checked]:bg-drio-red outline-none data-[state=unchecked]:border border-gray-300"
                checked={policiesState.selectedRows.length > 0}
                onCheckedChange={() => {
                  clearSelectedRows?.();
                }}
              >
                <Checkbox.Indicator className="text-white">
                  <HiMinusSm />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <h3 className={"font-medium text-sm text-gray-700"}>
                {policiesState.selectedRows.length} Item(s) Selected
              </h3>

              <button className="transition-all duration-200 bg-indigo-50 hover:bg-indigo-100 px-2 py-1 flex items-center ml-3 rounded border-2 border-indigo-200 text-drio-red-dark">
                <IoRefresh className="mr-1 font-bold" />
                <span className="text-sm font-medium">Re-run</span>
              </button>
            </div>
          )}

          <div className="flex gap-4 ml-auto">
            <Button
              intent={"primary"}
              onClick={() => router.push("/policies/new-policy")}
            >
              <div className="flex items-center gap-1">
                <HiPlus />
                <span className="inline-block">Add New Policy</span>
              </div>
            </Button>

            <Button intent={"primary"}>
              <div className="flex items-center gap-1">
                <HiUpload />
                <span className="inline-block">Import Text/PDF</span>
              </div>
            </Button>
          </div>
        </div>

        <Table
          headers={headers}
          menu={PoliciesMenu}
          rows={policiesState.rows}
          // editForm={EditOrgAccountForm}
          handleCheckbox={handleCheckbox}
          selectedRows={policiesState.selectedRows}
        />
      </div>
    </div>
  );
};

export default Policies;
