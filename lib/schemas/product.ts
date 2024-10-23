import z from "zod";

// Zod schema for ProductVariantColor (no id required)
export const productVariantColorSchema = z.object({
	color: z.string().min(1, "Color is required"),
	images: z.array(z.string()).default([]),
});

// Zod schema for the Product (without id, as this is for creation)
export const productCreateSchema = z.object({
	name: z.string().min(1, "Name is required"),
	description: z.string().optional(),
	price: z.coerce.number().min(1, "Price is required"),
	code: z.string().min(1, "Code is required"),
	ProductVariantColor: z.array(productVariantColorSchema).optional(),
});
