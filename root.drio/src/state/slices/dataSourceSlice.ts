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
      name: "KBB Kafka",
      ou: "corp",
      ddx: "ddx_1",
      type: "Kafka",
      endpoint: "mykafka.host.com:9093",
      datasets: 25,
      schemaRegistry: "http://my-schema-registry:8081",
      catalogManagement: "http://my-catalogue-mgr.com",
      documentation: "Swagger",
    },
    {
      id: "2",
      name: "Dealer Kinesis",
      ou: "corp",
      ddx: "ddx_2",
      type: "AWS Kinesis",
      endpoint: "mykinesis.host.com:9093",
      datasets: 25,
      schemaRegistry: "http://my-schema-registry:8081",
      catalogManagement: "None",
      documentation: "Swagger",
    },
    {
      id: "3",
      name: "Policy-GDPR",
      ou: "corp",
      ddx: "ddx_3",
      type: "Kafka",
      endpoint: "mykafka.host.com:9093",
      datasets: 25,
      schemaRegistry: "http://my-schema-registry:8081",
      catalogManagement: "http://my-catalogue-mgr.com",
      documentation: "None",
    },
    {
      id: "4",
      name: "VISA Kinesis",
      ou: "corp",
      ddx: "ddx_4",
      type: "AWS Kinesis",
      endpoint: "mykinesis.host.com:9093",
      datasets: 25,
      schemaRegistry: "http://my-schema-registry:8081",
      catalogManagement: "http://my-catalogue-mgr.com",
      documentation: "Swagger",
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
