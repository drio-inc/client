import Table from "@/comps/ui/Table";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";
import { setSelectedRows } from "@/state/slices/subscriptionContractSlice";
import SubscriptionContractsMenu from "./SubscriptionContractsMenu/SubscriptionContractsMenu";

import { HiMinusSm } from "react-icons/hi";
import { IoRefresh } from "react-icons/io5";
import * as Checkbox from "@radix-ui/react-checkbox";

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
    header: "Date Approved",
    accessor: "dateOfApproval",
    status: {
      Pending: "bg-yellow-100 text-yellow-900 px-2 py-1 font-medium rounded",
      Rejected: "bg-red-100 text-red-900 px-2 py-1 font-medium rounded",
    },
  },

  {
    header: "Daily Usage Frequency",
    accessor: "frequency",
  },

  {
    header: "Alerts (7 days)",
    accessor: "alerts",
  },
];

const SubscriptionContracts = () => {
  const dispatch = useAppDispatch();
  const subscriptionContractState = useAppSelector((state) => state.subscriptionContract);

  const handleCheckbox = (index: number) => {
    if (subscriptionContractState.selectedRows.includes(index)) {
      dispatch(
        setSelectedRows(subscriptionContractState.selectedRows.filter((row) => row !== index))
      );
    } else {
      dispatch(setSelectedRows([...subscriptionContractState.selectedRows, index]));
    }
  };

  const clearSelectedRows = () => {
    dispatch(setSelectedRows([]));
  };

  return (
    <div className="w-full">
      <div className={"flex flex-col w-full shadow-lg rounded-lg bg-white"}>
        <span className="text-lg text-gray-700 font-semibold inline-block p-4 my-1 bg-white">
          Subscription Contracts
        </span>
        {subscriptionContractState.selectedRows.length > 0 && (
          <div
            className={`rounded-lg bg-gray-50 px-4 py-3 flex flex-wrap items-center justify-between`}
          >
            <div className="flex items-center">
              <Checkbox.Root
                className="mr-3 flex h-4 w-4 appearance-none items-center justify-center rounded bg-white data-[state=checked]:bg-drio-red outline-none data-[state=unchecked]:border border-gray-300"
                checked={subscriptionContractState.selectedRows.length > 0}
                onCheckedChange={() => {
                  clearSelectedRows?.();
                }}
              >
                <Checkbox.Indicator className="text-white">
                  <HiMinusSm />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <h3 className={"font-medium text-sm text-gray-700"}>
                {subscriptionContractState.selectedRows.length} Item(s) Selected
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
          menu={SubscriptionContractsMenu}
          rows={subscriptionContractState.rows}
          handleCheckbox={handleCheckbox}
          selectedRows={subscriptionContractState.selectedRows}
        />
      </div>
    </div>
  );
};

export default SubscriptionContracts;
