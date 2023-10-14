import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ShipmentState = {
  rows: TableRow[];
  selectedRows: number[];
  selectedRow: number | null;
};

const initialState: ShipmentState = {
  rows: [
    {
      id: "1",
      destination: "London",
      orderID: "#13737689",
      carrierName: "FedEx",
      customerName: "Andy Bernard",
      productName: "M13",
      delay: "2 days",
      plannedETA: "23/09/23",
    },
    {
      id: "2",
      destination: "London",
      orderID: "#13737689",
      carrierName: "FedEx",
      customerName: "Andy Bernard",
      productName: "M13",
      delay: "2 days",
      plannedETA: "23/09/23",
    },
    {
      id: "3",
      destination: "London",
      orderID: "#13737689",
      carrierName: "FedEx",
      customerName: "Andy Bernard",
      productName: "M13",
      delay: "2 days",
      plannedETA: "23/09/23",
    },
    {
      id: "4",
      destination: "London",
      orderID: "#13737689",
      carrierName: "FedEx",
      customerName: "Andy Bernard",
      productName: "M13",
      delay: "2 days",
      plannedETA: "23/09/23",
    },
    {
      id: "5",
      destination: "London",
      orderID: "#13737689",
      carrierName: "FedEx",
      customerName: "Andy Bernard",
      productName: "M13",
      delay: "2 days",
      plannedETA: "23/09/23",
    },
    {
      id: "6",
      destination: "London",
      orderID: "#13737689",
      carrierName: "FedEx",
      customerName: "Andy Bernard",
      productName: "M13",
      delay: "2 days",
      plannedETA: "23/09/23",
    },
    {
      id: "7",
      destination: "London",
      orderID: "#13737689",
      carrierName: "FedEx",
      customerName: "Andy Bernard",
      productName: "M13",
      delay: "2 days",
      plannedETA: "23/09/23",
    },
    {
      id: "8",
      destination: "London",
      orderID: "#13737689",
      carrierName: "FedEx",
      customerName: "Andy Bernard",
      productName: "M13",
      delay: "2 days",
      plannedETA: "23/09/23",
    },
  ],
  selectedRows: [],
  selectedRow: null,
};

const shipmentSlice = createSlice({
  name: "shipment",
  initialState,
  reducers: {
    setRows(state, action) {
      state.rows = action.payload;
    },

    setSelectedRows(state, action) {
      state.selectedRows = action.payload;
    },

    setSelectedRow(state, action: PayloadAction<number | null>) {
      state.selectedRow = action.payload;
    },
  },

  extraReducers: (builder) => {},
});

export const { setRows, setSelectedRow, setSelectedRows } =
  shipmentSlice.actions;

export default shipmentSlice.reducer;
