type TableRow = {
  [key: string]: any;
};

type User = {
  id: string;
  email: string;
  state?: string;
  city?: string;
  country?: string;
  login_id?: string;
  last_name: string;
  first_name: string;
  created_at?: string;
  updated_at?: string;
};

type OrganizationUnit = {
  id: string;
  ou?: string;
  city: string;
  name: string;
  state: string;
  country: string;
  created_at: string;
  updated_at: string;
  account_id: string;
  ddx_clusters: DDXCluster[];
  data_sources: DataSource[];
};

type DDXCluster = {
  id: string;
  name: string;
  token: string;
  twofaurl: string;
  created_at: string;
  updated_at: string;
  ddx_instances: DDXInstance[];

  account_id?: string;
  ou_id?: string;
  ou?: string;
};

type DDXInstance = {
  id: string;
  name: string;
  ipaddress: string;
  cluster_id: string;
  created_at: string;
  updated_at: string;
  state: "running" | "stopped" | "upgrading" | "failed";

  account_id?: string;
  ou_id?: string;
};

type DefaultParams = {
  ou_id: string;
  account_id: string;
};

type RegistryData = {
  id: string;
  ou?: string;
  name: string;
  ou_id: string;
  secure: boolean;
  endpoints: string;
  account_id: string;
  updated_at: string;
  created_at: string;
  insecure_skip_verify: boolean;
};

type DataSource = RegistryData & {
  sr_id: string;
  ms_id: string;

  kind: string;
  cluster_id: string;
  cluster_name: string;

  schema_registries: RegistryData;
  metadata_servers: RegistryData;
};

type Lexicon = {
  id: string;
  ou: string;
  name: string;
  domain: string;
  description: string;
  status: string;
  last_updated: string;
  pre_existing: string;
  docs_in_corpus: number;
};
