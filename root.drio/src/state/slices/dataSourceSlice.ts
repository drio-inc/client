import { createSlice } from "@reduxjs/toolkit";

type dataSourceState = {
  rows: TableRow[];
  selectedRows: number[];
};

const initialState: dataSourceState = {
  rows: [
    {
      id: "1",
      sourceName: "My Kafka 1",
      type: "Kafka",
      endpoint: "mykafka.host.com:9093",
      datasets: 25,
      schemaRegistry: "http://my-schema-registry:8081",
      metadataManagement: "Yes",
      apiDocumentation: "Swagger",
    },
    {
      id: "2",
      sourceName: "My Kafka 1",
      type: "Kafka",
      endpoint: "mykafka.host.com:9093",
      datasets: 25,
      schemaRegistry: "http://my-schema-registry:8081",
      metadataManagement: "Yes",
      apiDocumentation: "Swagger",
    },
    {
      id: "3",
      sourceName: "My Kafka 1",
      type: "Kafka",
      endpoint: "mykafka.host.com:9093",
      datasets: 25,
      schemaRegistry: "http://my-schema-registry:8081",
      metadataManagement: "Yes",
      apiDocumentation: "Swagger",
    },
    {
      id: "4",
      sourceName: "My Kafka 1",
      type: "Kafka",
      endpoint: "mykafka.host.com:9093",
      datasets: 25,
      schemaRegistry: "http://my-schema-registry:8081",
      metadataManagement: "Yes",
      apiDocumentation: "Swagger",
    },
  ],
  selectedRows: [],
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
  },

  extraReducers: (builder) => {},
});

export const { setRows, setSelectedRows } = dataSourceSlice.actions;

export default dataSourceSlice.reducer;
