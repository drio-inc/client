import { createSlice } from "@reduxjs/toolkit";

type LexiconState = {
  rows: Lexicon[];
  selectedRows: string[];
};

const initialState: LexiconState = {
  rows: [
    {
      id: "1",
      name: "Dict 1",
      ou: "Manufacturing",
      domain: "Supply Chain",
      description: "General dictionary description",
      docs_in_corpus: 13,
      pre_existing: "Yes",
      status: "Uploaded",
      last_updated: "2021-09-01",
    },

    {
      id: "2",
      name: "Dict 2",
      ou: "Sales",
      domain: "Loans/Contracts",
      description: "General dictionary description",
      docs_in_corpus: 6,
      pre_existing: "Yes",
      status: "Uploaded",
      last_updated: "2021-09-01",
    },

    {
      id: "3",
      name: "Dict 3",
      ou: "Engineering",
      domain: "Auto mfg",
      description: "General dictionary description",
      docs_in_corpus: 8,
      pre_existing: "Yes",
      status: "Uploaded",
      last_updated: "2021-09-01",
    },

    {
      id: "4",
      name: "Dict 4",
      ou: "KBB",
      domain: "Automobile",
      description: "General dictionary description",
      docs_in_corpus: 3,
      pre_existing: "Yes",
      status: "Uploaded",
      last_updated: "2021-09-01",
    },

    {
      id: "5",
      name: "Dict 5",
      ou: "XTime",
      domain: "Auto Service",
      description: "General dictionary description",
      docs_in_corpus: 4,
      pre_existing: "Yes",
      status: "Uploaded",
      last_updated: "2021-09-01",
    },
  ],
  selectedRows: [],
};

const lexiconSlice = createSlice({
  name: "alertPolicies",
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

export const { setRows, setSelectedRows } = lexiconSlice.actions;

export default lexiconSlice.reducer;
