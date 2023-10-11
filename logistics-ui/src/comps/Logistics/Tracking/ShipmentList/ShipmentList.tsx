import Table from "@/comps/ui/Table";
import { faker } from "@faker-js/faker";
import { setRows, setSelectedRows } from "@/state/slices/shipmentSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

import { HiMinusSm } from "react-icons/hi";
import { IoRefresh } from "react-icons/io5";
import * as Checkbox from "@radix-ui/react-checkbox";

const headers = [
  {
    header: "Destination",
    accessor: "destination",
  },

  {
    header: "Order ID",
    accessor: "orderID",
  },

  {
    header: "Carrier Name",
    accessor: "carrierName",
    status: {
      Active: "bg-green-100 text-green-800 px-2 py-1 font-medium rounded",
      Inactive: "bg-gray-100 text-gray-800 px-2 py-1 font-medium rounded",
      Pending: "bg-yellow-100 text-yellow-800 px-2 py-1 font-medium rounded",
      "Not Configured": "bg-red-100 text-red-800 px-2 py-1 font-medium rounded",
    },
  },

  {
    header: "Customer Name",
    accessor: "customerName",
  },

  {
    header: "Product Name",
    accessor: "productName",
  },

  {
    header: "Delay",
    accessor: "delay",
  },

  {
    header: "Planned ETA",
    accessor: "plannedETA",
  },
];

const ShipmentList = () => {
  const dispatch = useAppDispatch();
  const shipmentState = useAppSelector((state) => state.shipment);

  const handleCheckbox = (index: number) => {
    if (shipmentState.selectedRows.includes(index)) {
      dispatch(
        setSelectedRows(
          shipmentState.selectedRows.filter((row) => row !== index)
        )
      );
    } else {
      dispatch(setSelectedRows([...shipmentState.selectedRows, index]));
    }
  };

  const clearSelectedRows = () => dispatch(setSelectedRows([]));

  return (
    <div className="flex-grow py-2">
      <div className={"flex flex-col w-full shadow-lg rounded-lg bg-white"}>
        <div
          className={` bg-gray-50 flex flex-wrap items-center justify-between`}
        >
          {shipmentState.selectedRows.length > 0 && (
            <div className="flex items-center px-4 py-4">
              <Checkbox.Root
                className="mr-3 flex h-4 w-4 appearance-none items-center justify-center rounded bg-white data-[state=checked]:bg-drio-red outline-none data-[state=unchecked]:border border-gray-300"
                checked={shipmentState.selectedRows.length > 0}
                onCheckedChange={() => {
                  clearSelectedRows?.();
                }}
              >
                <Checkbox.Indicator className="text-white">
                  <HiMinusSm />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <h3 className={"font-medium text-sm text-gray-700"}>
                {shipmentState.selectedRows.length} Item(s) Selected
              </h3>

              <button className="transition-all duration-200 bg-indigo-50 hover:bg-indigo-100 px-2 py-1 flex items-center ml-3 rounded border-2 border-indigo-200 text-drio-red-dark">
                <IoRefresh className="mr-1 font-bold" />
                <span className="text-sm font-medium">Re-run</span>
              </button>
            </div>
          )}
        </div>

        <Table
          rows={[
            {
              destination: "London",
              orderID: "#13737689",
              carrierName: "FedEx",
              customerName: "Andy Bernard",
              productName: "M13",
              delay: "2 days",
              plannedETA: "23/09/23",
            },
            {
              destination: "London",
              orderID: "#13737689",
              carrierName: "FedEx",
              customerName: "Andy Bernard",
              productName: "M13",
              delay: "2 days",
              plannedETA: "23/09/23",
            },
            {
              destination: "London",
              orderID: "#13737689",
              carrierName: "FedEx",
              customerName: "Andy Bernard",
              productName: "M13",
              delay: "2 days",
              plannedETA: "23/09/23",
            },
            {
              destination: "London",
              orderID: "#13737689",
              carrierName: "FedEx",
              customerName: "Andy Bernard",
              productName: "M13",
              delay: "2 days",
              plannedETA: "23/09/23",
            },
            {
              destination: "London",
              orderID: "#13737689",
              carrierName: "FedEx",
              customerName: "Andy Bernard",
              productName: "M13",
              delay: "2 days",
              plannedETA: "23/09/23",
            },
            {
              destination: "London",
              orderID: "#13737689",
              carrierName: "FedEx",
              customerName: "Andy Bernard",
              productName: "M13",
              delay: "2 days",
              plannedETA: "23/09/23",
            },
          ]}
          headers={headers}
          handleCheckbox={handleCheckbox}
          selectedRows={shipmentState.selectedRows}
        />
      </div>
    </div>
  );
};

export default ShipmentList;
