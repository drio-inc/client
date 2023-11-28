export type DataSourceFormdata = DefaultParams & {
  name: string;
  kind: string;
  secure: boolean;
  endpoints: string;
  cluster_id: string;
  cluster_name: string;
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

export type MutationResponse = {
  message: string;
  data_source: DataSource;
};

export type DataSourceParams = DefaultParams & {
  id: string;
};
