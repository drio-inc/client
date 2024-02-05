export type Anomalies = {
  iqr: number;
  name: string;
  field: string;
  timestamp: number;
  value: string | number | boolean;
  anomaly_type: "comparison" | "iqr";
  datatype: string | number | boolean;
  new_datatype: string | number | boolean;
  event_type:
    | "anomaly"
    | "Cluster Anomaly"
    | "added_new_field"
    | "datatype_mismatch";

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
