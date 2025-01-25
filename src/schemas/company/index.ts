import { z } from "zod";

export const CompanySchema = z.object({
  NIT: z.string(),
  name: z.string(),
  address: z.string(),
  phone_indicator: z.string(),
  phone: z.string(),
});
