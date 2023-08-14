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
    name: "streetAddress",
    label: "Street address",
    placeholder: "Enter your street address",
  },
];

export const detailFields = [
  {
    type: "text",
    required: true,
    name: "rootAdminFirstName",
    label: "Root Admin First Name",
    placeholder: "Enter root admin first name",
  },
  {
    type: "text",
    name: "rootAdminLastName",
    label: "Root Admin Last Name",
    placeholder: "Enter root admin last name",
  },
  {
    type: "text",
    required: true,
    name: "rootAdminID",
    autoComplete: "nope",
    label: "Root Admin ID",
    placeholder: "Enter your ID",
  },
  {
    required: true,
    type: "password",
    name: "rootAdminInitialPassword",
    label: "Root Admin Initial Password",
    placeholder: "Enter root admin password",
  },
];

export const contactFields = [
  {
    type: "text",
    name: "firstName",
    autoComplete: "nope",
    label: "First Name",
    placeholder: "First name",
  },
  {
    type: "text",
    name: "lastName",
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
    name: "contactNumber",
    label: "Contact Number",
    placeholder: "Enter your number",
  },
];

export const schema = z.object({
  streetAddress: z.string().optional(),
  name: z.string().nonempty("Please Enter a value"),

  country: z.string({
    required_error: "Please Enter a value",
  }),

  city: z.string().optional(),
  state: z.string().optional(),

  zipCode: z.string().optional(),
  description: z.string().optional(),

  rootAdminLastName: z.string().optional(),
  rootAdminID: z.string().nonempty("Please Enter a value"),
  rootAdminFirstName: z.string().nonempty("Please Enter a value"),
  rootAdminInitialPassword: z.string().nonempty("Please Enter a value"),

  lastName: z.string().optional(),
  firstName: z.string().optional(),
  email: z.string().nonempty("Please Enter a value"),
  contactNumber: z.string().nonempty("Please Enter a value"),
});

export type FormData = z.infer<typeof schema>;
export type FormKeyTypes = keyof FormData;
