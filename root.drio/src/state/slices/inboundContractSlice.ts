import { createSlice } from "@reduxjs/toolkit";

type InboundContractSlice = {
  rows: TableRow[];
  selectedRows: number[];
};

const initialState: InboundContractSlice = {
  rows: [
    {
      id: "1",
      ou: "KBB Kafka",
      dataset: "Kafka",
      personaList: "Marketing, Finance",
      dateOfRequest: "11/11/2023",
      status: "Being Approved",
      frequency: 25,
      expiryDate: "12/12/2023",
      alerts: 8,
    },
    {
      id: "2",
      ou: "Dealer Kafka",
      dataset: "Kafka",
      personaList: "Marketing, Finance",
      dateOfRequest: "11/11/2023",
      status: "Pending",
      frequency: 25,
      expiryDate: "12/12/2023",
      alerts: 8,
    },
    {
      id: "3",
      ou: "Policy-GDPR",
      dataset: "Kafka",
      personaList: "Marketing, Finance",
      dateOfRequest: "11/11/2023",
      status: "Rejected",
      frequency: 25,
      expiryDate: "12/12/2023",
      alerts: 8,
    },
    {
      id: "4",
      ou: "MySQL-DT",
      dataset: "Kafka",
      personaList: "Marketing, Finance",
      dateOfRequest: "11/11/2023",
      status: "Pending",
      frequency: 25,
      expiryDate: "12/12/2023",
      alerts: 8,
    },
  ],
  selectedRows: [],
};

const inboundContractSlice = createSlice({
  name: "inboundContract",
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

export const { setRows, setSelectedRows } = inboundContractSlice.actions;

export default inboundContractSlice.reducer;
