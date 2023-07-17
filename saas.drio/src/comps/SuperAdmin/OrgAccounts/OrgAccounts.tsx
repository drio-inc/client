import Table from "@/comps/ui/Table";

import { setSelectedRows } from "@/state/slices/adminOrgAccountSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

import OrgAccountMenu from "./OrgAccountMenu";
import AddOrgAccountForm from "./AddOrgAccountForm";
import EditOrgAccountForm from "./EditOrgAccountForm";

import Button from "@ui/Button";
import Modal from "@/comps/ui/Modal";
import { IoRefresh } from "react-icons/io5";
import { HiMinusSm, HiPlus, HiX } from "react-icons/hi";
import * as Checkbox from "@radix-ui/react-checkbox";
import { setCloseModal, setOpenModal } from "@/state/slices/uiSlice";

const headers = [
  {
    header: "Organizational Unit",
    accessor: "ou",
  },
  {
    header: "Location",
    accessor: "location",
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

const OrgAccounts = ({ modal = false }: { modal?: boolean }) => {
  const dispatch = useAppDispatch();
  const adminOrgAccountState = useAppSelector((state) => state.adminOrgAccount);

  const handleCheckbox = (index: number) => {
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
    <div className={`${!modal && `py-8`} w-full`}>
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

          <div className="flex items-center gap-4 ml-auto">
            <Button
              intent={"primary"}
              onClick={() => dispatch(setOpenModal("addOrgAccountForm"))}
            >
              <div className="flex items-center gap-1">
                <HiPlus />
                <span className="inline-block">Add New Organization Unit</span>
              </div>
            </Button>

            {modal && (
              <span>
                <HiX
                  className="w-8 h-8 cursor-pointer hover:text-drio-red-dark transition-all duration-200"
                  onClick={() => dispatch(setCloseModal("orgAccountTable"))}
                />
              </span>
            )}
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
          editForm={EditOrgAccountForm}
          rows={adminOrgAccountState.rows}
          handleCheckbox={handleCheckbox}
          selectedRows={adminOrgAccountState.selectedRows}
        />
      </div>
    </div>
  );
};

export default OrgAccounts;
