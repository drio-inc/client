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
  name: string;
  state: string;
  city?: string;
  country: string;
  created_at: string;
  updated_at: string;
  account_id: string;
};

type DDXCluster = {
  id: string;
  name: string;
  token: string;
  twofaurl: string;
  created_at: string;
  updated_at: string;
};

type DDXInstance = {
  id: string;
  name: string;
  ipaddress: string;
  cluster_id: string;
  created_at: string;
  updated_at: string;
  state: "running" | "stopped" | "upgrading" | "failed";
};

interface JwtPayload {
  sub: string;
  iat: number;
  iss: string;
  jti: string;
  nbf: number;
  version: number;
  user_type: number;
  account_id: string;
}
