export type OrgUnitFormData = {
  name: string;
  city: string;
  state: string;
  country: string;
  street_address?: string;
};

export type OrgUnitCreationResponse = {
  message: string;
  organization_unit: OrganizationUnit;
};

export type DeleteOrgUnitResponse = {
  message: string;
  organization_unit: OrganizationUnit;
};
