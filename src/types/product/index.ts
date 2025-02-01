import { ProductCategorySchema, ProductSchema } from "../../schemas/product";
import { z } from "zod";

export type ProductDTO = z.infer<typeof ProductSchema>;

export type UpdateProductDTO = Omit<ProductDTO, 'code'>;

export type CreateCategoryDTO = z.infer<typeof ProductCategorySchema>;

export type CategoriesDTO = {
  id: number;
  category: string;
}

export type CreateNewCategoryDTO = {
  category: string;
}