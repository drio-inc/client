import { createSlice } from "@reduxjs/toolkit";

type datasetState = {
  rows: TableRow[];
  selectedRows: number[];
};

const initialState: datasetState = {
  rows: [
    {
      id: "1",
      dataset: "Service Record",
      ou: "98",
      sixMonthsAccess: 25,
      public: "Private",
      frequency: "25",
      alerts: "1",
      contractInPlace: "Yes",
    },
    {
      id: "2",
      dataset: "Accidents",
      ou: "98",
      sixMonthsAccess: 25,
      public: "Contract",
      frequency: "25",
      alerts: "1",
      contractInPlace: "In-Progress",
    },
    {
      id: "3",
      dataset: "Dealer Sales",
      ou: "98",
      sixMonthsAccess: 25,
      public: "Exported",
      frequency: "25",
      alerts: "1",
      contractInPlace: "No",
    },
    {
      id: "4",
      dataset: "Customer Sales",
      ou: "98",
      sixMonthsAccess: 25,
      public: "Private",
      frequency: "25",
      alerts: "1",
      contractInPlace: "Yes",
    },
  ],
  selectedRows: [],
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
  },

  extraReducers: (builder) => {},
});

export const { setRows, setSelectedRows } = datasetSlice.actions;

export default datasetSlice.reducer;
