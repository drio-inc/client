import { createSlice } from "@reduxjs/toolkit";

type LicensingState = {
  rows: TableRow[];
  selectedRows: number[];
};

const initialState: LicensingState = {
  rows: [
    {
      id: "1",
      account: "Coca Cola",
      sku: "Basic-123",
      expiryDate: "2021-12-31",
      capacityDatasets: "20,000",
      capacityContracts: "10,000",
      usedDS_C: "25%/50%",
      dataAccessRate: "500/day",
    },
    {
      id: "2",
      account: "Paypal",
      sku: "Basic-123",
      expiryDate: "2021-12-31",
      capacityDatasets: "20,000",
      capacityContracts: "10,000",
      usedDS_C: "25%/50%",
      dataAccessRate: "500/day",
    },
    {
      id: "3",
      account: "Pepsi",
      sku: "Basic-123",
      expiryDate: "2021-12-31",
      capacityDatasets: "20,000",
      capacityContracts: "10,000",
      usedDS_C: "25%/50%",
      dataAccessRate: "500/day",
    },
    {
      id: "4",
      account: "VISA",
      sku: "Basic-123",
      expiryDate: "2021-12-31",
      capacityDatasets: "20,000",
      capacityContracts: "10,000",
      usedDS_C: "25%/50%",
      dataAccessRate: "500/day",
    },
  ],
  selectedRows: [],
};

const licensingSlice = createSlice({
  name: "licensing",
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

export const { setRows, setSelectedRows } = licensingSlice.actions;

export default licensingSlice.reducer;
