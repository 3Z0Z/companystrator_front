import { CompanySchema } from "../../schemas/company";
import { z } from "zod";

export type CompanyDTO = z.infer<typeof CompanySchema>;