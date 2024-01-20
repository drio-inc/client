import { createSlice } from "@reduxjs/toolkit";
import { orgUnitApi } from "@/api/resources/ous";

type OrgUnitState = {
  selectedRows: number[];
  rows: OrganizationUnit[];
  recursiveRows: TableRow[];
};

const initialState: OrgUnitState = {
  rows: [],
  selectedRows: [],
  recursiveRows: [],
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

    setRecursiveRows(state, action) {
      state.recursiveRows = action.payload;
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

export const { setRows, setSelectedRows, setRecursiveRows } =
  orgUnitSlice.actions;

export default orgUnitSlice.reducer;
