import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ShipmentState = {
  rows: TableRow[];
  selectedRows: number[];
};

const initialState: ShipmentState = {
  rows: [],
  selectedRows: [],
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
  },

  extraReducers: (builder) => {},
});

export const { setRows, setSelectedRows } = shipmentSlice.actions;

export default shipmentSlice.reducer;
