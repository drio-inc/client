export type AccountFormData = {
  email: string;
  state: string;
  city?: string;
  country: string;
  ou_name: string;
  password: string;
  login_id: string;
  last_name: string;
  first_name: string;
  account_name: string;
};

export type AccountCreationResponse = ApiResponse<{
  message: string;
  account_id: string;
}>;

type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  login_id: string;
  state: string;
  city?: string;
  country: string;
  created_at: string;
  updated_at: string;
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

export type Account = {
  id: string;
  name: string;
  state: string;
  city?: string;
  users: User[];
  country: string;
  created_at: string;
  updated_at: string;
  organization_units: OrganizationUnit[];
};

export type Accounts = Account[];
