type TableRow = {
  [key: string]: any;
};

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
