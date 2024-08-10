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
      domain: "Finance",
      datasets: 3,
      consumers: 20,
      rule_name: "Auto marketing",
      max_daily_limit: 1000,
      max_rate_limit: "100 / sec",
      validity: "1 year",
    },
    {
      id: "2",
      name: "Fraud App",
      domain: "Network Security",
      datasets: 1,
      consumers: 20,
      rule_name: "Wells Fargo Financial",
      max_daily_limit: 5000,
      max_rate_limit: "500 / sec",
      validity: "2 years",
    },
    {
      id: "3",
      name: "Marketing Analytics",
      domain: "Automobile Manufacturing",
      datasets: 2,
      consumers: 10,
      rule_name: "Shipping Quotation",
      max_daily_limit: 2000,
      max_rate_limit: "200 / sec",
      validity: "3 years",
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
