import { createSlice } from "@reduxjs/toolkit";
import { orgUnitApi } from "@/api/resources/ous";

type OrgUnitState = {
  rows: TableRow[];
  selectedRows: number[];
};

const initialState: OrgUnitState = {
  rows: [],
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

  extraReducers: (builder) => {
    builder.addMatcher(
      orgUnitApi.endpoints.getOrgUnits.matchFulfilled,
      (state, action) => {
        state.rows = action.payload;
      }
    );
  },
});

export const { setRows, setSelectedRows } = orgUnitSlice.actions;

export default orgUnitSlice.reducer;
