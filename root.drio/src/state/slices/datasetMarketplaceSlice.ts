import { createSlice } from "@reduxjs/toolkit";

type SubscribeDatasetState = {
  rows: TableRow[];
  selectedRows: number[];
};

const initialState: SubscribeDatasetState = {
  rows: [
    {
      id: "1",
      dataset: "Service Record",
      account: "Cox Automotive",
      ou: "Xtime",
      visibility: "Private",
      frequency: "25",
      alerts: "1",
      contractInPlace: "Yes",
    },
    {
      id: "2",
      dataset: "Accidents",
      account: "Cox Automotive",
      ou: "Dealer.com",
      visibility: "Contractual",
      frequency: "25",
      alerts: "1",
      contractInPlace: "In-Progress",
    },
    {
      id: "3",
      dataset: "Dealer Sales",
      account: "Cox Automotive",
      ou: "Kelly Blue Book",
      visibility: "Public",
      frequency: "25",
      alerts: "1",
      contractInPlace: "No",
    },
    {
      id: "4",
      dataset: "Customer Sales",
      account: "Cox Automotive",
      ou: "Corp",
      visibility: "Private",
      frequency: "25",
      alerts: "1",
      contractInPlace: "Yes",
    },
    {
      id: "5",
      dataset: "SAP Inventory",
      account: "Cox Automotive",
      ou: "Corp",
      visibility: "Private",
      frequency: "25",
      alerts: "1",
      contractInPlace: "Yes",
    },
    {
      id: "6",
      dataset: "Salesforce Orders",
      account: "Cox Automotive",
      ou: "Corp",
      visibility: "Public",
      frequency: "25",
      alerts: "1",
      contractInPlace: "No",
    },
  ],
  selectedRows: [],
};

const datasetMarketplaceSlice = createSlice({
  name: "datasetMarketplace",
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

export const { setRows, setSelectedRows } = datasetMarketplaceSlice.actions;

export default datasetMarketplaceSlice.reducer;
