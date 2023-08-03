import { createSlice } from "@reduxjs/toolkit";

type OrgUnitState = {
  rows: TableRow[];
  selectedRows: number[];
};

const initialState: OrgUnitState = {
  rows: [
    {
      id: "1",
      ou: "Cox Automotive",
      location: "San Diego, California, USA",
      dsPublished: 25,
      contract: "2/22",
      frequency: "798/day",
      alerts: 2,
    },
    {
      id: "2",
      ou: "Cox Automotive",
      location: "San Diego, California, USA",
      dsPublished: 25,
      contract: "2/22",
      frequency: "798/day",
      alerts: 2,
    },
    {
      id: "3",
      ou: "Cox Automotive",
      location: "San Diego, California, USA",
      dsPublished: 25,
      contract: "2/22",
      frequency: "798/day",
      alerts: 2,
    },
    {
      id: "4",
      ou: "Cox Automotive",
      location: "San Diego, California, USA",
      dsPublished: 25,
      contract: "2/22",
      frequency: "798/day",
      alerts: 2,
    },
  ],
  selectedRows: [],
};

const orgUnitSlice = createSlice({
  name: "orgUnit",
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

export const { setRows, setSelectedRows } = orgUnitSlice.actions;

export default orgUnitSlice.reducer;
