import { z } from "zod";

export const CompanySchema = z.object({
  NIT: z.string()
    .regex(/^[0-9]{8,10}$/, 'Invalid NIT format. It must contain only numbers and have 8 to 10 digits'),
  name: z.string()
    .min(5, 'Company name must be 5 characters or more')
    .max(70, 'Company name must be 70 characters or less')
    .regex(/^[a-zA-Z0-9 .]{5,70}$/, 'Company name must be 5 to 70 characters and can only contain letters, numbers, spaces or periods(.)'),
  address: z.string()
    .min(10, 'Company address must be at least 10 characters')
    .max(150, 'Company address must be 150 characters or less')
    .regex(/^[a-zA-Z0-9 .#-]{10,150}$/, 'Company address can only contain letters, numbers, spaces or special characters(#, -)'),
  phone_indicator: z.string()
    .regex(/^\+([0-9]{1,3})$/, 'Phone indicator must start with a "+" followed by 1 to 3 digits'),
  phone: z.string()
    .regex(/^[0-9]{7,15}$/, 'Phone number must be a valid phone number with 7 to 15 digits'),
});
