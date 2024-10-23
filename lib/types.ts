import { z } from "zod";
import { productCreateSchema } from "./schemas/product";

export type TCreateProduct = z.infer<typeof productCreateSchema>;