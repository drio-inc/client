export type DataSourceFormdata = DefaultParams & {
  name: string;
  kind: string;
  secure: boolean;
  endpoints: string;
  cluster_id: string;
  metric_port?: string;
  cluster_name: string;
  fetch_interval?: number;
  insecure_skip_verify: boolean;

  schema_registry?: {
    name: string;
    endpoints: string;
  };

  metadata_server?: {
    name: string;
    endpoints: string;
  };
};

export type DataSourceResponse = {
  message: string;
  data_source: DataSource;
};

export type DataSourceParams = DefaultParams & {
  id: string;
};
