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
