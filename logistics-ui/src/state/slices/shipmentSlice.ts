import trackingData from "../../data/tracking.json";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ShipmentState = {
  rows: TableRow[];
  selectedRows: number[];
  selectedRow: TableRow | null;
  selectedRowIndex: number | null;
};

const initialState: ShipmentState = {
  rows: trackingData,
  selectedRows: [],
  selectedRow: null,
  selectedRowIndex: null,
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

    setSelectedRowIndex(state, action: PayloadAction<number | null>) {
      state.selectedRowIndex = action.payload;
    },

    setSelectedRow(state, action) {
      state.selectedRow = action.payload;
    },
  },

  extraReducers: (builder) => {},
});

export const { setRows, setSelectedRowIndex, setSelectedRow, setSelectedRows } =
  shipmentSlice.actions;

export default shipmentSlice.reducer;
