export type RegisterFormData = {
  email: string;
  state: string;
  city?: string;
  country: string;
  ou_name?: string;
  password: string;
  login_id: string;
  last_name: string;
  first_name: string;
  account_name: string;
};

export type AccountCreationResponse = {
  message: string;
  account_id: string;
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

export type DeleteAccountResponse = {
  message: string;
  account: Account;
};
