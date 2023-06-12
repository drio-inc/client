import Table from "@/comps/ui/Table";
import { setSelectedRows } from "@/state/slices/dataContractSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

import DataContractsmenu from "./DataContractsMenu/DataContractsMenu";

import { HiMinusSm } from "react-icons/hi";
import { IoRefresh } from "react-icons/io5";
import * as Checkbox from "@radix-ui/react-checkbox";
import { setOpenModal } from "@/state/slices/uiSlice";

import Modal from "@/comps/ui/Modal";

const headers = [
  {
    header: "Org/BU Requesting",
    accessor: "ou",
  },
  {
    header: "Dataset",
    accessor: "dataset",
  },

  {
    header: "Persona List",
    accessor: "personaList",
  },

  {
    header: "Date of Request",
    accessor: "dateOfRequest",
  },

  {
    header: "Status",
    accessor: "status",
    status: {
      "Being Approved":
        "bg-green-100 text-green-800 px-2 py-1 font-medium rounded",
      Pending: "bg-yellow-100 text-yellow-800 px-2 py-1 font-medium rounded",
      Rejected: "bg-red-100 text-red-800 px-2 py-1 font-medium rounded",
    },
  },

  {
    header: "Daily Usage Frequency",
    accessor: "frequency",
  },

  {
    header: "Expiry Date",
    accessor: "expiryDate",
  },

  {
    header: "Alerts (7 days)",
    accessor: "alerts",
  },
];

const DataContracts = () => {
  const dispatch = useAppDispatch();
  const dataContractState = useAppSelector((state) => state.dataContract);

  const handleRowSelection = (index: number) => {
    if (dataContractState.selectedRows.includes(index)) {
      dispatch(
        setSelectedRows(
          dataContractState.selectedRows.filter((row) => row !== index)
        )
      );
    } else {
      dispatch(setSelectedRows([...dataContractState.selectedRows, index]));
    }
  };

  const clearSelectedRows = () => {
    dispatch(setSelectedRows([]));
  };

  return (
    <div className="py-2 w-full">
      <span className="text-sm text-gray-500 inline-block px-4 py-2 my-2 bg-white rounded-md border">
        Contracts to Approve
      </span>

      <div className={"flex flex-col w-full shadow-lg rounded-lg bg-white"}>
        {dataContractState.selectedRows.length > 0 && (
          <div
            className={`rounded-lg bg-gray-50 px-4 py-3 flex flex-wrap items-center justify-between`}
          >
            <div className="flex items-center">
              <Checkbox.Root
                className="mr-3 flex h-4 w-4 appearance-none items-center justify-center rounded bg-white data-[state=checked]:bg-drio-red outline-none data-[state=unchecked]:border border-gray-300"
                checked={dataContractState.selectedRows.length > 0}
                onCheckedChange={() => {
                  clearSelectedRows?.();
                }}
              >
                <Checkbox.Indicator className="text-white">
                  <HiMinusSm />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <h3 className={"font-medium text-sm text-gray-700"}>
                {dataContractState.selectedRows.length} Item(s) Selected
              </h3>

              <button className="transition-all duration-200 bg-indigo-50 hover:bg-indigo-100 px-2 py-1 flex items-center ml-3 rounded border-2 border-indigo-200 text-drio-red-dark">
                <IoRefresh className="mr-1 font-bold" />
                <span className="text-sm font-medium">Re-run</span>
              </button>
            </div>
          </div>
        )}

        <Table
          headers={headers}
          menu={DataContractsmenu}
          rows={dataContractState.rows}
          handleRowSelection={handleRowSelection}
          selectedRows={dataContractState.selectedRows}
        />
      </div>
    </div>
  );
};

export default DataContracts;
