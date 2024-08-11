import { createSlice } from "@reduxjs/toolkit";

type PersonaSlice = {
  rows: TableRow[];
  selectedRows: number[];
};

const initialState: PersonaSlice = {
  rows: [
    {
      id: "1",
      name: "Loan App",
      domain: "finance",
      datasets: 3,
      consumers: 20,
      ruleset_name: "auto_marketing",
      max_daily_limit: 1000,
      max_rate_limit: "100 / sec",
      validity: "1 year",
      description: "This is a loan app",
    },
    {
      id: "2",
      name: "Fraud App",
      domain: "network_security",
      datasets: 1,
      consumers: 20,
      ruleset_name: "wells_fargo_financial",
      max_daily_limit: 5000,
      max_rate_limit: "500 / sec",
      validity: "2 years",
      description: "This is a fraud app",
    },
    {
      id: "3",
      name: "Marketing Analytics",
      domain: "automobile_manufacturing",
      datasets: 2,
      consumers: 10,
      ruleset_name: "shipping_quotation",
      max_daily_limit: 2000,
      max_rate_limit: "200 / sec",
      validity: "3 years",
      description: "This is a marketing analytics app",
    },
  ],

  selectedRows: [],
};

const personaSlice = createSlice({
  name: "personas",
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

export const { setRows, setSelectedRows } = personaSlice.actions;

export default personaSlice.reducer;
