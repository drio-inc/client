import { createSlice } from "@reduxjs/toolkit";

type AdminOrgAccountState = {
  rows: TableRow[];
  selectedRows: number[];
};

const initialState: AdminOrgAccountState = {
  rows: [
    {
      id: "1",
      ou: "Cox Automotive",
      authentication: "OKTA",
      datasetsPublished: 25,
      publicContractDatasets: "2/22",
      dailyUsageFrequency: "798/day",
      alert: 2,
    },
    {
      id: "2",
      ou: "Cox Automotive",
      authentication: "OKTA",
      datasetsPublished: 25,
      publicContractDatasets: "2/22",
      dailyUsageFrequency: "798/day",
      alert: 2,
    },
    {
      id: "3",
      ou: "Cox Automotive",
      authentication: "OKTA",
      datasetsPublished: 25,
      publicContractDatasets: "2/22",
      dailyUsageFrequency: "798/day",
      alert: 2,
    },
    {
      id: "4",
      ou: "Cox Automotive",
      authentication: "OKTA",
      datasetsPublished: 25,
      publicContractDatasets: "2/22",
      dailyUsageFrequency: "798/day",
      alert: 2,
    },
  ],
  selectedRows: [],
};

const adminOrgAccountSlice = createSlice({
  name: "adminOrgAccount",
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

export const { setRows, setSelectedRows } = adminOrgAccountSlice.actions;

export default adminOrgAccountSlice.reducer;
