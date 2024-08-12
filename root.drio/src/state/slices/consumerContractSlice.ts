import { createSlice } from "@reduxjs/toolkit";

type ConsumerContractSlice = {
  rows: TableRow[];
  selectedRows: number[];
};

const initialState: ConsumerContractSlice = {
  rows: [
    {
      id: "1",
      alerts: 8,
      frequency: 25,
      ou: "KBB Kafka",
      dataset: "Kafka",
      state: "Being Approved",
      expiryDate: "12/12/2023",
      dateOfRequest: "11/11/2023",
      personaList: "Marketing, Finance",
    },
    {
      id: "2",
      alerts: 8,
      frequency: 25,
      dataset: "Kafka",
      state: "Pending",
      ou: "Dealer Kafka",
      expiryDate: "12/12/2023",
      dateOfRequest: "11/11/2023",
      personaList: "Marketing, Finance",
    },
    {
      id: "3",
      alerts: 8,
      frequency: 25,
      dataset: "Kafka",
      state: "Rejected",
      ou: "Policy-GDPR",
      expiryDate: "12/12/2023",
      dateOfRequest: "11/11/2023",
      personaList: "Marketing, Finance",
    },
    {
      id: "4",
      alerts: 8,
      frequency: 25,
      ou: "MySQL-DT",
      state: "Pending",
      dataset: "Kafka",
      expiryDate: "12/12/2023",
      dateOfRequest: "11/11/2023",
      personaList: "Marketing, Finance",
    },
  ],
  selectedRows: [],
};

const consumerContractSlice = createSlice({
  name: "consumerContract",
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

export const { setRows, setSelectedRows } = consumerContractSlice.actions;

export default consumerContractSlice.reducer;
