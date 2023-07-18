import { createSlice } from "@reduxjs/toolkit";

type AdminOrgAccountState = {
  rows: any[];
  selectedRows: any[];
};

const initialState: AdminOrgAccountState = {
  rows: [
    {
      id: "1",
      ou: "Cox Automotive",
      authentication: "OKTA",
      dsPublished: 25,
      contract: "2/22",
      frequency: "798/day",
      alerts: 2,
    },
    {
      id: "2",
      ou: "Paypal",
      authentication: "OKTA",
      dsPublished: 25,
      contract: "2/22",
      frequency: "798/day",
      alerts: 2,
    },
    {
      id: "3",
      ou: "KKB",
      authentication: "OKTA",
      dsPublished: 25,
      contract: "2/22",
      frequency: "798/day",
      alerts: 2,
    },
    {
      id: "4",
      ou: "VISA",
      authentication: "OKTA",
      dsPublished: 25,
      contract: "2/22",
      frequency: "798/day",
      alerts: 2,
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
