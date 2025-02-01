import { z } from "zod";

export const ProductSchema = z.object({
  code: z.string()
    .regex(/^\d{10}$/, "Code must be exactly 10 digits"),
  name: z.string()
    .min(10, "Product name must be at least 10 characters")
    .max(20, "Product name must be at most 20 characters")
    .regex(/^[a-zA-Z0-9 .-]+$/, "Allowed: letters, numbers, spaces, and special characters (.-)"),
  description: z.string()
    .min(10, "Description must be at least 10 characters")
    .max(80, "Description must be at most 80 characters")
    .regex(/^[a-zA-Z0-9 .-]+$/, "Allowed: letters, numbers, spaces, and special characters (.-)"),
  price_cop: z.number().positive("Price in COP must be greater than zero"),
  price_usd: z.number().positive("Price in USD must be greater than zero"),
  price_mxn: z.number().positive("Price in MXN must be greater than zero"),
  primary_category: z.number()
    .int("Primary category must be an integer")
    .nullable()
    .refine(value => value !== null, { message: "You must select a primary category" }),
  secondary_category: z.number().int().optional().nullable()
});

export const ProductCategorySchema = z.object({
  category: z.string()
    .min(10, "Product category must be at least 5 characters")
    .max(20, "Product category must be at most 20 characters")
    .regex(/^[a-zA-Z0-9_]{5,20}$/, "Must be 5 to 20 characters, letters, numbes and special characters(_)")
});