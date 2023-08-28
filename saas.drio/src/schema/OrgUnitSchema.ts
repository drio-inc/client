import { z } from "zod";

const schema = z.object({
  ou: z.string().nonempty("Please Enter a value"),

  streetAddress: z.string().optional(),

  country: z.string({
    required_error: "Please select a country",
  }),

  state: z.string({
    required_error: "Please select a state",
  }),

  city: z.string({
    required_error: "Please select a city",
  }),
});

export const createOrgUnitSchema = schema;
export const updateOrgUnitSchema = schema;

export type CreateOrgUnitFormData = z.infer<typeof createOrgUnitSchema>;
export type UpdateOrgUnitFormData = z.infer<typeof updateOrgUnitSchema>;
