export type LicenseKeyResponse = {
  licenseKey: string;
};

export type DDXClusterFormData = {
  name: string;
  twofaurl: string;
};

export type DDXClusterResponse = {
  message: string;
  ddx_cluster: DDXCluster;
};

export type DDXInstanceFormData = {
  name: string;
  token?: string;
  ipaddress: string;
  state: "running" | "stopped" | "upgrading" | "failed";
};

export type DDXInstanceResponse = {
  message: string;
  ddx_instance: DDXInstance;
};
