import Table from "@/comps/ui/Table";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";
import { setSelectedRows } from "@/state/slices/alertAnomalyPoliciesSlice";

import { HiMinusSm } from "react-icons/hi";
import { IoRefresh } from "react-icons/io5";
import * as Checkbox from "@radix-ui/react-checkbox";

const headers = [
  {
    header: "Alert Rule",
    accessor: "alertRule",
  },
  {
    header: "Trigger",
    accessor: "trigger",
  },
  {
    header: "Data Resource",
    accessor: "dataResource",
  },
  {
    header: "Threshold Value",
    accessor: "thresholdValue",
  },
  {
    header: "Message",
    accessor: "message",
  },
  {
    header: "Occurence History",
    accessor: "occurenceHistory",
  },
];

const AlertAnomalyPolicies = () => {
  const dispatch = useAppDispatch();
  const alertAnomalyPoliciesState = useAppSelector(
    (state) => state.alertsAnomalyPolicies
  );

  const handleCheckbox = (index: number) => {
    if (alertAnomalyPoliciesState.selectedRows.includes(index)) {
      dispatch(
        setSelectedRows(
          alertAnomalyPoliciesState.selectedRows.filter((row) => row !== index)
        )
      );
    } else {
      dispatch(
        setSelectedRows([...alertAnomalyPoliciesState.selectedRows, index])
      );
    }
  };

  const clearSelectedRows = () => dispatch(setSelectedRows([]));

  return (
    <div className="w-full">
      <div className={"flex flex-col w-full shadow-lg rounded-lg bg-white"}>
        {alertAnomalyPoliciesState.selectedRows.length > 0 && (
          <div className="flex items-center p-4 bg-gray-50">
            <Checkbox.Root
              className="mr-3 flex h-4 w-4 appearance-none items-center justify-center rounded bg-white data-[state=checked]:bg-drio-red outline-none data-[state=unchecked]:border border-gray-300"
              checked={alertAnomalyPoliciesState.selectedRows.length > 0}
              onCheckedChange={() => {
                clearSelectedRows?.();
              }}
            >
              <Checkbox.Indicator className="text-white">
                <HiMinusSm />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <h3 className={"font-medium text-sm text-gray-700"}>
              {alertAnomalyPoliciesState.selectedRows.length} Item(s) Selected
            </h3>

            <button className="transition-all duration-200 bg-indigo-50 hover:bg-indigo-100 px-2 py-1 flex items-center ml-3 rounded border-2 border-indigo-200 text-drio-red-dark">
              <IoRefresh className="mr-1 font-bold" />
              <span className="text-sm font-medium">Re-run</span>
            </button>
          </div>
        )}

        <Table
          headers={headers}
          handleCheckbox={handleCheckbox}
          rows={alertAnomalyPoliciesState.rows}
          selectedRows={alertAnomalyPoliciesState.selectedRows}
        />
      </div>
    </div>
  );
};

export default AlertAnomalyPolicies;
