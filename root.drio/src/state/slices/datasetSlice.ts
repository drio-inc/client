import { createSlice } from "@reduxjs/toolkit";

//  {
//       id: "1",
//       alerts: 7,
//       ou: "Corp",
//       frequency: 10,
//       topic: "purchase",
//       json: "sample.json",
//       sixMonthsAccess: 25,
//       name: "SAP Inventory",
//       contractInPlace: "No",
//       visibility: "contractual",
//       dataSource: "dealer_kinesis",
//       baseURL: "https://example.com",
//     },
//     {
//       id: "2",
//       alerts: 7,
//       ou: "Corp",
//       frequency: 10,
//       topic: "purchase",
//       json: "sample.json",
//       sixMonthsAccess: 25,
//       visibility: "private",
//       contractInPlace: "Yes",
//       name: "Salesforce Orders",
//       dataSource: "visa_kinesis",
//       baseURL: "https://example.com",
//     },
//     {
//       id: "3",
//       alerts: 7,
//       ou: "Corp",
//       frequency: 10,
//       topic: "mysql",
//       json: "sample.json",
//       sixMonthsAccess: 25,
//       visibility: "public",
//       name: "Dealer Sales",
//       contractInPlace: "No",
//       dataSource: "policy-gdpr",
//       baseURL: "https://example.com",
//     },
//     {
//       id: "4",
//       alerts: 7,
//       ou: "Corp",
//       frequency: 10,
//       topic: "all",
//       json: "sample.json",
//       sixMonthsAccess: 25,
//       visibility: "private",
//       name: "Customer Sales",
//       contractInPlace: "Yes",
//       dataSource: "kbb_kafka",
//       baseURL: "https://example.com",
//     },

type datasetState = {
  rows: TableRow[];
  trigger?: boolean;
  rawRows: TableRow[];
  selectedRows: number[];
  addNewDispatched: boolean;
};

const initialState: datasetState = {
  rows: [],
  rawRows: [],
  trigger: false,
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

    setTrigger(state, action) {
      state.trigger = action.payload;
    },

    setRawRows(state, action) {
      state.rawRows = action.payload;
    },
  },

  extraReducers: (builder) => {},
});

export const {
  setRows,
  setTrigger,
  setRawRows,
  setSelectedRows,
  setAddNewDispatched,
} = datasetSlice.actions;

export default datasetSlice.reducer;
