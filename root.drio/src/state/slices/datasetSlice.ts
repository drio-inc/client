import { createSlice } from "@reduxjs/toolkit";

type datasetState = {
  rows: TableRow[];
  selectedRows: number[];
  addNewDispatched: boolean;
};

const initialState: datasetState = {
  rows: [
    {
      id: "1",
      dataset: "SAP Inventory",
      ou: "Corp",
      sixMonthsAccess: 25,
      visibility: "Private",
      frequency: "25",
      alerts: "1",
      contractInPlace: "Yes",
    },
    {
      id: "2",
      dataset: "Salesforce Orders",
      ou: "Corp",
      sixMonthsAccess: 25,
      visibility: "Contractual",
      frequency: "25",
      alerts: "1",
      contractInPlace: "In-Progress",
    },
    {
      id: "3",
      dataset: "Dealer Sales",
      ou: "Corp",
      sixMonthsAccess: 25,
      visibility: "Public",
      frequency: "25",
      alerts: "1",
      contractInPlace: "No",
    },
    {
      id: "4",
      dataset: "Customer Sales",
      ou: "Corp",
      sixMonthsAccess: 25,
      visibility: "Private",
      frequency: "25",
      alerts: "1",
      contractInPlace: "Yes",
    },
  ],
  selectedRows: [],
  addNewDispatched: false,
};

const datasetSlice = createSlice({
  name: "dataset",
  initialState,
  reducers: {
    setRows(state, action) {
      state.rows = action.payload;
    },

    setSelectedRows(state, action) {
      state.selectedRows = action.payload;
    },

    setAddNewDispatched(state, action) {
      state.addNewDispatched = action.payload;
    },
  },

  extraReducers: (builder) => {},
});

export const { setRows, setSelectedRows, setAddNewDispatched } =
  datasetSlice.actions;

export default datasetSlice.reducer;
