import { createSlice } from "@reduxjs/toolkit";

type Stream = {
  id: string;
  dataset_id: string;
  stream_name: string;
  window_size: string;
  max_samples: string;
  data_source_id: string;
  window_function: string;
  stream_description: string;
  max_samples_enabled: boolean;
  window_type: "sliding" | "step" | undefined;
};

export type RuleTemplate = {
  id: string;
  enabled: string;
  streams: Stream[];
  rule_name: string;
  times_used: number;
  times_queried: number;
  number_of_fields: number;
  rule_description: string;
  number_of_streams: number;

  composite_stream?: string;
  threshold_condition: string;
};

type RuleTemplateSlice = {
  rows: RuleTemplate[];
  selectedRows: number[];
};

const initialState: RuleTemplateSlice = {
  rows: [
    {
      id: "1",
      times_used: 7,
      enabled: "yes",
      times_queried: 21,
      number_of_fields: 1,
      number_of_streams: 1,
      rule_name: "Avg Threshold",
      composite_stream: "Temperature",
      threshold_condition: "greater than 10",
      rule_description: "Basic single variable moving average",

      streams: [
        {
          id: "1",
          dataset_id: "any",
          window_size: "5",
          max_samples: "100",
          window_type: "sliding",
          window_function: "mean",
          max_samples_enabled: true,
          stream_name: "Temperature",
          data_source_id: "user_specify",
          stream_description: "Temperature stream",
        },
      ],
    },
    {
      id: "2",
      enabled: "no",
      times_used: 4,
      times_queried: 13,
      number_of_fields: 1,
      number_of_streams: 1,
      rule_name: "Max Threshold",
      composite_stream: "Temperature",
      threshold_condition: "greater than 10",
      rule_description: "Basic but looking only at max over a sliding window",

      streams: [
        {
          id: "1",
          max_samples: "",
          window_size: "5",
          window_type: "step",
          data_source_id: "any",
          window_function: "max",
          dataset_id: "user_specify",
          stream_name: "Temperature",
          max_samples_enabled: false,
          stream_description: "Temperature stream",
        },
      ],
    },
    {
      id: "3",
      times_used: 2,
      enabled: "yes",
      times_queried: 2,
      number_of_fields: 1,
      number_of_streams: 1,
      rule_name: "Spike Detector",
      composite_stream: "Temperature",
      threshold_condition: "greater than 10",
      rule_description: "Small range stat vs long range stat",

      streams: [
        {
          id: "1",
          window_size: "5",
          max_samples: "",
          dataset_id: "any",
          window_type: "sliding",
          window_function: "mean",
          max_samples_enabled: false,
          stream_name: "Temperature",
          data_source_id: "user_specify",
          stream_description: "Temperature stream",
        },
      ],
    },
  ],
  selectedRows: [],
};

const ruleTemplateSlice = createSlice({
  name: "ruleTemplate",
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

export const { setRows, setSelectedRows } = ruleTemplateSlice.actions;

export default ruleTemplateSlice.reducer;
