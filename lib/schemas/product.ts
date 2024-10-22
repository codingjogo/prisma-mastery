import z from "zod";

export const productVariantColorSchema = z.object({
	id: z.string().uuid("Invalid UUID"),
    product_id: z.string().uuid("Invalid UUID").nullable(),
	color: z.string(),
    created_at: z.date().nullable().optional(),
    updated_at: z.date().nullable().optional(),
});

export const createProductVariantColorSchema = productVariantColorSchema.partial();

export const productSchema = z.object({
	id: z.string().uuid("Invalid UUID"),
	name: z.string().nonempty("Name is required"),
	price: z.number().positive("Price must be positive"),
	code: z.string().nonempty("Code is required"),
	description: z.string().nullable(),
	created_at: z.date().nullable().optional(),
	updated_at: z.date().nullable().optional(),
	ProductVariantColor: z.array(createProductVariantColorSchema).min(1, "at least one color"),
});

export const createProductSchema = productSchema.omit({ id: true });
