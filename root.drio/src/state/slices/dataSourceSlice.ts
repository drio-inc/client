import { createSlice } from "@reduxjs/toolkit";

type dataSourceState = {
  rows: TableRow[];
  selectedRows: number[];
  defaultSource: TableRow | null;
};

const initialState: dataSourceState = {
  rows: [
    {
      id: "1",
      sourceName: "KBB Kafka",
      type: "Kafka",
      endpoint: "mykafka.host.com:9093",
      datasets: 25,
      schemaRegistry: "http://my-schema-registry:8081",
      metadataManagement: "Yes",
      apiDocumentation: "Swagger",
    },
    {
      id: "2",
      sourceName: "Dealer Kafka",
      type: "Kafka",
      endpoint: "mykafka.host.com:9093",
      datasets: 25,
      schemaRegistry: "http://my-schema-registry:8081",
      metadataManagement: "Yes",
      apiDocumentation: "Swagger",
    },
    {
      id: "3",
      sourceName: "Policy-GDPR",
      type: "Kafka",
      endpoint: "mykafka.host.com:9093",
      datasets: 25,
      schemaRegistry: "http://my-schema-registry:8081",
      metadataManagement: "Yes",
      apiDocumentation: "Swagger",
    },
    {
      id: "4",
      sourceName: "MySQL-DT",
      type: "Kafka",
      endpoint: "mykafka.host.com:9093",
      datasets: 25,
      schemaRegistry: "http://my-schema-registry:8081",
      metadataManagement: "Yes",
      apiDocumentation: "Swagger",
    },
  ],
  selectedRows: [],
  defaultSource: null,
};

const dataSourceSlice = createSlice({
  name: "dataSource",
  initialState,
  reducers: {
    setRows(state, action) {
      state.rows = action.payload;
    },

    setSelectedRows(state, action) {
      state.selectedRows = action.payload;
    },

    setDefaultSource(state, action) {
      state.defaultSource = action.payload;
    },
  },

  extraReducers: (builder) => {},
});

export const { setRows, setSelectedRows, setDefaultSource } =
  dataSourceSlice.actions;

export default dataSourceSlice.reducer;
