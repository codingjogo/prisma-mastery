import { z } from "zod";
import { createProductSchema, productSchema, updateProductSchema } from "./schemas/product";

export type TProduct = z.infer<typeof productSchema>;
export type TCreateProduct = z.infer<typeof createProductSchema>;
export type TUpdateProduct = z.infer<typeof updateProductSchema>;