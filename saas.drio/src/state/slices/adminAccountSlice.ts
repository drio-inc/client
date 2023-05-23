import { createSlice } from "@reduxjs/toolkit";

type AdminAccountState = {
  rows: any[];
  selectedRows: any[];
};

const initialState: AdminAccountState = {
  rows: [
    {
      id: "1",
      account: "Cox Automotive",
      ous: 5,
      authentication: "OKTA",
      datasetsPublished: 25,
      publicContractDatasets: "2/22",
      dailyUsageFrequency: "798/day",
      alerts: 2,
    },
    {
      id: "2",
      account: "VISA",
      ous: 5,
      authentication: "LDAP",
      datasetsPublished: 25,
      publicContractDatasets: "2/22",
      dailyUsageFrequency: "798/day",
      alerts: 2,
    },
    {
      id: "3",
      account: "Paypal",
      ous: 5,
      authentication: "GOOGLE",
      datasetsPublished: 25,
      publicContractDatasets: "2/22",
      dailyUsageFrequency: "798/day",
      alerts: 2,
    },
    {
      id: "4",
      account: "KKB",
      ous: 5,
      authentication: "OAuth",
      datasetsPublished: 25,
      publicContractDatasets: "2/22",
      dailyUsageFrequency: "798/day",
      alerts: 2,
    },
  ],
  selectedRows: [],
};

const adminAccountSlice = createSlice({
  name: "adminAccount",
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

export const { setRows, setSelectedRows } = adminAccountSlice.actions;

export default adminAccountSlice.reducer;
