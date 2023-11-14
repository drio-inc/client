import { createSlice } from "@reduxjs/toolkit";

type AnomalyState = {
  rows: TableRow[];
  row: TableRow | null;
  selectedRows: number[];
};

const initialState: AnomalyState = {
  row: null,
  rows: [
    {
      id: "1",
      anomalyName: "Access Error",
      timeOfOccurrence: "11/7/23 12:10:17",
      severity: "Error",
      dataset: "Service Record",
      accessingOrg: "XTime",
      sourceIP: "11.1.5.63",
      country: "USA",
    },
    {
      id: "2",
      anomalyName: "Schema Change",
      timeOfOccurrence: "11/7/23 12:10:17",
      severity: "Info",
      dataset: "Accidents",
      accessingOrg: "KBB",
      sourceIP: "11.1.5.63",
      country: "Armania",
    },
    {
      id: "3",
      anomalyName: "CDC Notify",
      timeOfOccurrence: "11/7/23 12:10:17",
      severity: "Warning",
      dataset: "Dealer Sales",
      accessingOrg: "B Bank",
      sourceIP: "11.1.5.63",
      country: "Sweden",
    },
    {
      id: "4",
      anomalyName: "Accidents",
      timeOfOccurrence: "11/7/23 12:10:17",
      severity: "Warning",
      dataset: "Customer Sales",
      accessingOrg: "Dealer Track",
      sourceIP: "11.1.5.63",
      country: "USA",
    },
  ],
  selectedRows: [],
};

const anomalySlice = createSlice({
  name: "anomaly",
  initialState,
  reducers: {
    setRows(state, action) {
      state.rows = action.payload;
    },

    setSelectedRows(state, action) {
      state.selectedRows = action.payload;
    },

    setRow(state, action) {
      state.row = action.payload;
    },
  },

  extraReducers: (builder) => {},
});

export const { setRows, setSelectedRows, setRow } = anomalySlice.actions;

export default anomalySlice.reducer;
