import { faker } from "@faker-js/faker";
import ShipmentTable from "./ShipmentTable";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";
import { setRows, setSelectedRow } from "@/state/slices/shipmentSlice";

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
    if (shipmentState.selectedRow === index) {
      dispatch(setSelectedRow(null));
    } else {
      dispatch(setSelectedRow(index));
    }
  };

  return (
    <div className="col-span-12 lg:col-span-7 flex-grow w-full shadow-xs rounded-tl-lg rounded-bl-lg">
      <ShipmentTable
        headers={headers}
        rows={shipmentState.rows}
        handleCheckbox={handleCheckbox}
        selectedRow={shipmentState.selectedRow}
      />
    </div>
  );
};

export default ShipmentList;
