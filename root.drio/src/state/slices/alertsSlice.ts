import { createSlice } from "@reduxjs/toolkit";

type AlertState = {
  rows: TableRow[];
  selectedRows: number[];
  addNewDispatched: boolean;
};

const initialState: AlertState = {
  rows: [
    {
      id: "1",
      alertName: "Access Error",
      timeOfOccurrence: "11/7/23 12:10:17",
      severity: "Error",
      dataset: "Service Record",
      accessingOrg: "XTime",
      sourceIP: "11.1.5.63",
      country: "USA",
    },
    {
      id: "2",
      alertName: "Schema Change",
      timeOfOccurrence: "11/7/23 12:10:17",
      severity: "Info",
      dataset: "Accidents",
      accessingOrg: "KBB",
      sourceIP: "11.1.5.63",
      country: "Armania",
    },
    {
      id: "3",
      alertName: "CDC Notify",
      timeOfOccurrence: "11/7/23 12:10:17",
      severity: "Warning",
      dataset: "Dealer Sales",
      accessingOrg: "B Bank",
      sourceIP: "11.1.5.63",
      country: "Sweden",
    },
    {
      id: "4",
      alertName: "Accidents",
      timeOfOccurrence: "11/7/23 12:10:17",
      severity: "Warning",
      dataset: "Customer Sales",
      accessingOrg: "Dealer Track",
      sourceIP: "11.1.5.63",
      country: "USA",
    },
  ],
  selectedRows: [],
  addNewDispatched: false,
};

const alertState = createSlice({
  name: "alerts",
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

export const { setRows, setSelectedRows } = alertState.actions;

export default alertState.reducer;
