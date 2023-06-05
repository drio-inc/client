import Table from "@/comps/ui/Table";

import { setSelectedRows } from "@/state/slices/adminOrgAccountSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

import OrgAccountMenu from "./OrgAccountMenu";
import AddOrgAccountForm from "./AddOrgAccountForm";
import EditOrgAccountForm from "./EditOrgAccountForm";

import Modal from "@/comps/ui/Modal";
import Button from "@/comps/ui/Button";
import { IoRefresh } from "react-icons/io5";
import { HiMinusSm, HiPlus } from "react-icons/hi";
import * as Checkbox from "@radix-ui/react-checkbox";
import { setOpenModal } from "@/state/slices/uiSlice";

const headers = [
  {
    header: "Organizational Unit",
    accessor: "ou",
  },
  {
    header: "Authentication",
    accessor: "authentication",
  },

  {
    header: "Datasets Published",
    accessor: "dsPublished",
  },
  {
    header: "Public Contract Datasets",
    accessor: "contract",
  },
  {
    header: "Daily Usage Frequency",
    accessor: "frequency",
  },
  {
    header: "Alert ( 7 days)",
    accessor: "alerts",
  },
];

const OrgAccounts = () => {
  const dispatch = useAppDispatch();
  const adminOrgAccountState = useAppSelector((state) => state.adminOrgAccount);

  const handleRowSelection = (index: number) => {
    if (adminOrgAccountState.selectedRows.includes(index)) {
      dispatch(
        setSelectedRows(
          adminOrgAccountState.selectedRows.filter((row) => row !== index)
        )
      );
    } else {
      dispatch(setSelectedRows([...adminOrgAccountState.selectedRows, index]));
    }
  };

  const clearSelectedRows = () => {
    dispatch(setSelectedRows([]));
  };

  return (
    <div className="py-2 w-full">
      <div className={"flex flex-col w-full shadow-lg rounded-lg bg-white"}>
        <div
          className={`rounded-lg bg-gray-50 px-4 py-3 flex flex-wrap items-center justify-between`}
        >
          {adminOrgAccountState.selectedRows.length > 0 && (
            <div className="flex items-center">
              <Checkbox.Root
                className="mr-3 flex h-4 w-4 appearance-none items-center justify-center rounded bg-white data-[state=checked]:bg-drio-red outline-none data-[state=unchecked]:border border-gray-300"
                checked={adminOrgAccountState.selectedRows.length > 0}
                onCheckedChange={() => {
                  clearSelectedRows?.();
                }}
              >
                <Checkbox.Indicator className="text-white">
                  <HiMinusSm />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <h3 className={"font-medium text-sm text-gray-700"}>
                {adminOrgAccountState.selectedRows.length} Item(s) Selected
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
              onClick={() => dispatch(setOpenModal("addOrgAccountForm"))}
            >
              <div className="flex items-center gap-1">
                <HiPlus />
                <span className="inline-block">Add Organization Unit</span>
              </div>
            </Button>
          </div>

          <div className="hidden">
            <Modal identifier="addOrgAccountForm">
              <AddOrgAccountForm />
            </Modal>
          </div>
        </div>

        <Table
          headers={headers}
          menu={OrgAccountMenu}
          rows={adminOrgAccountState.rows}
          editForm={EditOrgAccountForm}
          handleRowSelection={handleRowSelection}
          selectedRows={adminOrgAccountState.selectedRows}
        />
      </div>
    </div>
  );
};

export default OrgAccounts;
