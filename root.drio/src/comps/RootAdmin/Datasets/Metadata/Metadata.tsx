import Table from "@/comps/ui/Table";
import MetadataMenu from "./MetadataMenu";
import { setSelectedRows } from "@/state/slices/alertsSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

import { HiMinusSm } from "react-icons/hi";
import { IoRefresh } from "react-icons/io5";
import * as Checkbox from "@radix-ui/react-checkbox";
import VisibilityPopover from "./HeaderPopovers/VisibilityPopover";
import MetadataPopover from "./HeaderPopovers/MetadataPopover";

const headers = [
  {
    header: "Logistics - Trip Data",
    accessor: "logisticsTripData",
  },
  {
    header: "Sample Value",
    accessor: "sampleValue",
  },
  {
    header: "Data Type",
    accessor: "dataType",
  },
  {
    header: "Visibility",
    accessor: "visibility",
    menu: <VisibilityPopover />,
  },
  {
    type: "array",
    header: "Metadata",
    accessor: "metadata",
    menu: <MetadataPopover />,
  },
  {
    header: "Last Updated",
    accessor: "lastUpdated",
  },
];

const Metadata = () => {
  const dispatch = useAppDispatch();
  const metadataState = useAppSelector((state) => state.metadata);

  const handleCheckbox = (index: number) => {
    if (metadataState.selectedRows.includes(index)) {
      dispatch(
        setSelectedRows(
          metadataState.selectedRows.filter((row) => row !== index)
        )
      );
    } else {
      dispatch(setSelectedRows([...metadataState.selectedRows, index]));
    }
  };

  const clearSelectedRows = () => {
    dispatch(setSelectedRows([]));
  };

  return (
    <div className="w-full">
      <div className={"flex flex-col w-full shadow-lg rounded-lg bg-white"}>
        {metadataState.selectedRows.length > 0 && (
          <div className="flex items-center p-4 bg-gray-50">
            <Checkbox.Root
              className="mr-3 flex h-4 w-4 appearance-none items-center justify-center rounded bg-white data-[state=checked]:bg-drio-red outline-none data-[state=unchecked]:border border-gray-300"
              checked={metadataState.selectedRows.length > 0}
              onCheckedChange={() => {
                clearSelectedRows?.();
              }}
            >
              <Checkbox.Indicator className="text-white">
                <HiMinusSm />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <h3 className={"font-medium text-sm text-gray-700"}>
              {metadataState.selectedRows.length} Item(s) Selected
            </h3>

            <button className="transition-all duration-200 bg-indigo-50 hover:bg-indigo-100 px-2 py-1 flex items-center ml-3 rounded border-2 border-indigo-200 text-drio-red-dark">
              <IoRefresh className="mr-1 font-bold" />
              <span className="text-sm font-medium">Re-run</span>
            </button>
          </div>
        )}

        <Table
          headers={headers}
          menu={MetadataMenu}
          rows={metadataState.rows}
          handleCheckbox={handleCheckbox}
          selectedRows={metadataState.selectedRows}
        />
      </div>
    </div>
  );
};

export default Metadata;
