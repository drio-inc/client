import Table from "@/comps/ui/Table";
import { setSelectedRows } from "@/state/slices/auditLogsSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

import { HiMinusSm } from "react-icons/hi";
import { IoRefresh } from "react-icons/io5";
import * as Checkbox from "@radix-ui/react-checkbox";
import SortLogsPopover from "../Anomalies/SortLogsPopover";

const headers = [
  {
    header: "Time of Access",
    accessor: "timeOfAccess",
  },
  {
    header: "Subscriber OU",
    accessor: "subscriberOU",
  },
  {
    header: "Dataset",
    accessor: "dataset",
  },
  {
    header: "Status",
    accessor: "status",
    status: {
      Error: "bg-red-100 text-red-900 px-2 py-1 font-medium rounded",
      Success: "bg-green-100 text-green-900 px-2 py-1 font-medium rounded",
      Warning: "bg-yellow-100 text-yellow-900 px-2 py-1 font-medium rounded",
    },
  },
  {
    header: "Accessing Entity",
    accessor: "accessingEntity",
  },
  {
    header: "Country",
    accessor: "country",
  },
];

const AuditLogs = () => {
  const dispatch = useAppDispatch();
  const auditLogsState = useAppSelector((state) => state.auditLogs);

  const handleCheckbox = (index: number) => {
    if (auditLogsState.selectedRows.includes(index)) {
      dispatch(setSelectedRows(auditLogsState.selectedRows.filter((row) => row !== index)));
    } else {
      dispatch(setSelectedRows([...auditLogsState.selectedRows, index]));
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
          {auditLogsState.selectedRows.length > 0 && (
            <div className="flex items-center">
              <Checkbox.Root
                className="mr-3 flex h-4 w-4 appearance-none items-center justify-center rounded bg-white data-[state=checked]:bg-drio-red outline-none data-[state=unchecked]:border border-gray-300"
                checked={auditLogsState.selectedRows.length > 0}
                onCheckedChange={() => {
                  clearSelectedRows?.();
                }}
              >
                <Checkbox.Indicator className="text-white">
                  <HiMinusSm />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <h3 className={"font-medium text-sm text-gray-700"}>
                {auditLogsState.selectedRows.length} Item(s) Selected
              </h3>

              <button className="transition-all duration-200 bg-indigo-50 hover:bg-indigo-100 px-2 py-1 flex items-center ml-3 rounded border-2 border-indigo-200 text-drio-red-dark">
                <IoRefresh className="mr-1 font-bold" />
                <span className="text-sm font-medium">Re-run</span>
              </button>
            </div>
          )}

          <div className="flex gap-4 ml-auto">
            <SortLogsPopover />
          </div>
        </div>

        <Table
          headers={headers}
          rows={auditLogsState.rows}
          handleCheckbox={handleCheckbox}
          selectedRows={auditLogsState.selectedRows}
        />
      </div>
    </div>
  );
};

export default AuditLogs;
