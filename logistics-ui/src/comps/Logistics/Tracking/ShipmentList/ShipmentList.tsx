import { faker } from "@faker-js/faker";
import ShipmentTable from "./ShipmentTable";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";
import {
  setRows,
  setSelectedRow,
  setSelectedRowIndex,
} from "@/state/slices/shipmentSlice";

const headers = [
  {
    header: "Destination",
    accessor: "destLocation",
  },

  {
    header: "Order ID",
    accessor: "orderId",
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
    header: "Delay",
    accessor: "delayInDays",
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
    if (shipmentState.selectedRowIndex === index) {
      dispatch(setSelectedRow(null));
      dispatch(setSelectedRowIndex(null));
    } else {
      const selectedRow = shipmentState.rows[index];

      dispatch(setSelectedRowIndex(index));
      dispatch(setSelectedRow(selectedRow));
    }
  };

  return (
    <div className="col-span-12 lg:col-span-8 flex-grow w-full shadow-xs rounded-tl-lg rounded-bl-lg bg-white">
      <h2 className="text-xl font-semibold p-4">Shipment List</h2>
      <ShipmentTable
        headers={headers}
        rows={shipmentState.rows}
        handleCheckbox={handleCheckbox}
        selectedRow={shipmentState.selectedRowIndex}
      />
    </div>
  );
};

export default ShipmentList;
