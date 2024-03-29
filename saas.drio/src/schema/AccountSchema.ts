import { z } from "zod";

export const nameFields = [
  {
    type: "text",
    required: true,
    name: "account_ID",
    autoComplete: "nope",
    label: "Account Name",
    placeholder: "Enter account Name",
  },
  {
    type: "text",
    name: "street_address",
    label: "Street address",
    placeholder: "Enter your street address",
  },
];

export const detailFields = [
  {
    type: "text",
    required: true,
    name: "first_name",
    label: "Root Admin First Name",
    placeholder: "Enter root admin first name",
  },
  {
    type: "text",
    required: true,
    name: "last_name",
    label: "Root Admin Last Name",
    placeholder: "Enter root admin last name",
  },
  {
    type: "text",
    required: true,
    name: "login_id",
    autoComplete: "nope",
    label: "Root Admin ID",
    placeholder: "Enter your ID",
  },
  {
    required: true,
    type: "password",
    name: "password",
    autoComplete: "nope",
    placeholder: "Enter root admin password",
    label: "Root Admin Initial Password (Must be at least 8 characters)",
  },
];

export const contactFields = [
  {
    type: "text",
    name: "first_name_2",
    autoComplete: "nope",
    label: "First Name",
    placeholder: "First name",
  },
  {
    type: "text",
    name: "last_name_2",
    label: "Last Name",
    autoComplete: "nope",
    placeholder: "Last name",
  },
  {
    type: "email",
    name: "email",
    required: true,
    label: "Email",
    placeholder: "Enter your email",
  },
  {
    type: "text",
    name: "contact_number",
    label: "Contact Number",
    placeholder: "Enter your number",
  },
];

export const schema = z.object({
  street_address: z.string().optional(),
  account_ID: z.string().nonempty("Please Enter a value"),

  country: z.string({
    required_error: "Please Enter a value",
  }),

  city: z.string({
    required_error: "Please Enter a value",
  }),

  state: z.string({
    required_error: "Please Enter a value",
  }),

  zip_code: z.string().optional(),
  description: z.string().optional(),

  login_id: z.string().nonempty("Please Enter a value"),
  last_name: z.string().nonempty("Please Enter a value"),
  first_name: z.string().nonempty("Please Enter a value"),

  last_name_2: z.string().optional(),
  first_name_2: z.string().optional(),
  contact_number: z.string().optional(),
  email: z.string().nonempty("Please Enter a value"),
});

export const createSchema = z
  .object({
    password: z.string().nonempty("Please Enter a value"),
  })
  .merge(schema);

export const updateSchema = schema;

export type CreateFormData = z.infer<typeof createSchema>;
export type CreateFormKeyTypes = keyof CreateFormData;

export type UpdateFormData = z.infer<typeof updateSchema>;
export type UpdateFormKeyTypes = keyof UpdateFormData;
