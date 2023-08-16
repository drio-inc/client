import { z } from "zod";

export const nameFields = [
  {
    type: "text",
    name: "name",
    required: true,
    autoComplete: "nope",
    label: "Account Name",
    placeholder: "Enter account name",
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
    label: "Root Admin Initial Password",
    placeholder: "Enter root admin password",
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
    required: true,
    name: "contact_number",
    label: "Contact Number",
    placeholder: "Enter your number",
  },
];

export const schema = z.object({
  street_address: z.string().optional(),
  name: z.string().nonempty("Please Enter a value"),

  country: z.string({
    required_error: "Please Enter a value",
  }),

  city: z.string().optional(),
  state: z.string().optional(),

  zip_code: z.string().optional(),
  description: z.string().optional(),

  last_name: z.string().optional(),
  login_id: z.string().nonempty("Please Enter a value"),
  first_name: z.string().nonempty("Please Enter a value"),
  password: z.string().nonempty("Please Enter a value"),

  last_name_2: z.string().optional(),
  first_name_2: z.string().optional(),
  email: z.string().nonempty("Please Enter a value"),
  contact_number: z.string().nonempty("Please Enter a value"),
});

export type FormData = z.infer<typeof schema>;
export type FormKeyTypes = keyof FormData;
