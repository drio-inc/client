export type Anomalies = {
  iqr: number;
  name: string;
  field: string;
  timestamp: number;
  value: string | number | boolean;
  anomaly_type: "comparison" | "iqr";
  datatype: string | number | boolean;
  new_datatype: string | number | boolean;
  event_type: "anomaly" | "datatype_mismatch" | "added_new_field";

  record: {
    [key: string]: string | number | boolean;
  };

  closest_data_points: {
    [key: string]: string | number | boolean;
  }[];
};

export type Anomaly = {
  data_source_id: string;
  anomalies: Anomalies[];
};
