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
