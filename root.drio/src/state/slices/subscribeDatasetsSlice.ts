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
      ou: "Xtime",
      visibility: "Private",
      frequency: "25",
      alerts: "1",
      contractInPlace: "Yes",
    },
    {
      id: "2",
      dataset: "Accidents",
      ou: "Dealer.com",
      visibility: "Contractual",
      frequency: "25",
      alerts: "1",
      contractInPlace: "In-Progress",
    },
    {
      id: "3",
      dataset: "Dealer Sales",
      ou: "Kelly Blue Book",
      visibility: "Public",
      frequency: "25",
      alerts: "1",
      contractInPlace: "No",
    },
    {
      id: "4",
      dataset: "Customer Sales",
      ou: "Cox Automotive",
      visibility: "Private",
      frequency: "25",
      alerts: "1",
      contractInPlace: "Yes",
    },
  ],
  selectedRows: [],
};

const subscribeDatasetSlice = createSlice({
  name: "subscribeDataset",
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

export const { setRows, setSelectedRows } = subscribeDatasetSlice.actions;

export default subscribeDatasetSlice.reducer;
