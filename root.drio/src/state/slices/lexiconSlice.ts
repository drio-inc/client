import { createSlice } from "@reduxjs/toolkit";

type LexiconState = {
  rows: Lexicon[];
  selectedRows: string[];
  lexiconDetails: Lexicon | null;
};

const initialState: LexiconState = {
  rows: [
    {
      id: "1",
      name: "Dict 1",
      ou: "Corp",
      domain: "Supply Chain",
      description: "General dictionary description",
      docs_in_corpus: 1,
      pre_existing: "Yes",
      status: "Deployed",
      last_updated: "2021-09-01",
      files: [
        {
          id: "0000-0000-0000-0000-0000",
          name: "sample.pdf",
          size: 286054,
        },
      ],
    },

    {
      id: "2",
      name: "Dict 2",
      ou: "Corp",
      domain: "Logistics/Transport",
      description: "General dictionary description",
      docs_in_corpus: 5,
      pre_existing: "Yes",
      status: "Disabled",
      last_updated: "2021-09-01",
      files: [
        {
          id: "0000-0000-0000-0000-0000",
          name: "sample.pdf",
          size: 286054,
        },
        {
          id: "0000-0000-0000-0000-0001",
          name: "sample-2.pdf",
          size: 286055,
        },
        {
          id: "0000-0000-0000-0000-0002",
          name: "sample-3.pdf",
          size: 286056,
        },
        {
          id: "0000-0000-0000-0000-0003",
          name: "sample-4.pdf",
          size: 286057,
        },
        {
          id: "0000-0000-0000-0000-0004",
          name: "sample-5.pdf",
          size: 286058,
        },
      ],
    },

    {
      id: "3",
      name: "Dict 3",
      ou: "Corp",
      domain: "Auto mfg",
      description: "General dictionary description",
      docs_in_corpus: 1,
      pre_existing: "Yes",
      status: "Uploaded",
      last_updated: "2021-09-01",
      files: [
        {
          id: "0000-0000-0000-0000-0000",
          name: "sample.pdf",
          size: 286054,
        },
      ],
    },

    {
      id: "4",
      name: "Dict 4",
      ou: "Corp",
      domain: "Automobile",
      description: "General dictionary description",
      docs_in_corpus: 2,
      pre_existing: "Yes",
      status: "Uploaded",
      last_updated: "2021-09-01",
      files: [
        {
          id: "0000-0000-0000-0000-0000",
          name: "sample.pdf",
          size: 286054,
        },
        {
          id: "0000-0000-0000-0000-0001",
          name: "sample-2.pdf",
          size: 286055,
        },
      ],
    },

    {
      id: "5",
      name: "Dict 5",
      ou: "Corp",
      domain: "Auto Service",
      description: "General dictionary description",
      docs_in_corpus: 3,
      pre_existing: "Yes",
      status: "Uploaded",
      last_updated: "2021-09-01",
      files: [
        {
          id: "0000-0000-0000-0000-0000",
          name: "sample.pdf",
          size: 286054,
        },
        {
          id: "0000-0000-0000-0000-0001",
          name: "sample-2.pdf",
          size: 286055,
        },
        {
          id: "0000-0000-0000-0000-0002",
          name: "sample-3.pdf",
          size: 286056,
        },
      ],
    },
  ],
  selectedRows: [],
  lexiconDetails: null,
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

    setLexiconDetails(state, action) {
      state.lexiconDetails = action.payload;
    },
  },

  extraReducers: (builder) => {},
});

export const { setRows, setSelectedRows, setLexiconDetails } = lexiconSlice.actions;

export default lexiconSlice.reducer;
