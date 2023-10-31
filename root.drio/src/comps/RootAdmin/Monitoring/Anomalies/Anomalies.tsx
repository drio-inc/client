import Table from "@/comps/ui/Table";
import { setSelectedRows } from "@/state/slices/anomaliesSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

import { HiMinusSm } from "react-icons/hi";
import { IoRefresh } from "react-icons/io5";
import * as Checkbox from "@radix-ui/react-checkbox";

const headers = [
  {
    header: "Anomaly Name",
    accessor: "anomalyName",
  },
  {
    header: "Time Occurred",
    accessor: "timeOfOccurrence",
  },
  {
    header: "Severity",
    accessor: "severity",
    status: {
      Info: "bg-blue-100 text-blue-800 px-2 py-1 font-medium rounded",
      Error: "bg-red-100 text-red-800 px-2 py-1 font-medium rounded",
      Warning: "bg-yellow-100 text-yellow-800 px-2 py-1 font-medium rounded",
    },
  },
  {
    header: "Dataset",
    accessor: "dataset",
  },
  {
    header: "Accessing ORG",
    accessor: "accessingOrg",
  },
  {
    header: "Source IP",
    accessor: "sourceIP",
  },
  {
    header: "Country",
    accessor: "country",
  },
];

const Anomalies = () => {
  const dispatch = useAppDispatch();
  const anomalyState = useAppSelector((state) => state.anomalies);

  const handleCheckbox = (index: number) => {
    if (anomalyState.selectedRows.includes(index)) {
      dispatch(
        setSelectedRows(
          anomalyState.selectedRows.filter((row) => row !== index)
        )
      );
    } else {
      dispatch(setSelectedRows([...anomalyState.selectedRows, index]));
    }
  };

  const clearSelectedRows = () => {
    dispatch(setSelectedRows([]));
  };

  return (
    <div className="w-full">
      <div className={"flex flex-col w-full shadow-lg rounded-lg bg-white"}>
        {anomalyState.selectedRows.length > 0 && (
          <div className="flex items-center p-4 bg-gray-50">
            <Checkbox.Root
              className="mr-3 flex h-4 w-4 appearance-none items-center justify-center rounded bg-white data-[state=checked]:bg-drio-red outline-none data-[state=unchecked]:border border-gray-300"
              checked={anomalyState.selectedRows.length > 0}
              onCheckedChange={() => {
                clearSelectedRows?.();
              }}
            >
              <Checkbox.Indicator className="text-white">
                <HiMinusSm />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <h3 className={"font-medium text-sm text-gray-700"}>
              {anomalyState.selectedRows.length} Item(s) Selected
            </h3>

            <button className="transition-all duration-200 bg-indigo-50 hover:bg-indigo-100 px-2 py-1 flex items-center ml-3 rounded border-2 border-indigo-200 text-drio-red-dark">
              <IoRefresh className="mr-1 font-bold" />
              <span className="text-sm font-medium">Re-run</span>
            </button>
          </div>
        )}

        <Table
          headers={headers}
          rows={anomalyState.rows}
          handleCheckbox={handleCheckbox}
          selectedRows={anomalyState.selectedRows}
        />
      </div>
    </div>
  );
};

export default Anomalies;
