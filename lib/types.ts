import { z } from "zod";
import { createProductSchema, productSchema } from "./schemas/product";

export type TProduct = z.infer<typeof productSchema>;
export type TCreateProduct = z.infer<typeof createProductSchema>;