import z from "zod";

// Helper function to parse strings into dates
const stringToDate = z
  .string()
  .transform((str) => new Date(str));

export const productVariantColorSchema = z.object({
	id: z.string().uuid("Invalid UUID"),
    product_id: z.string().uuid("Invalid UUID").nullable(),
	color: z.string(),
    created_at: z.union([stringToDate, z.date()]).nullable().optional(), // Transform string to Date
    updated_at: z.union([stringToDate, z.date()]).nullable().optional(), // Transform string to Date
});

export const createProductVariantColorSchema = productVariantColorSchema.partial();

export const productSchema = z.object({
	id: z.string().uuid("Invalid UUID"),
	name: z.string().nonempty("Name is required"),
	price: z.number().positive("Price must be positive"),
	code: z.string().nonempty("Code is required"),
	description: z.string().nullable(),
	created_at: z.union([stringToDate, z.date()]).nullable().optional(), // Transform string to Date
    updated_at: z.union([stringToDate, z.date()]).nullable().optional(), // Transform string to Date
	ProductVariantColor: z.array(createProductVariantColorSchema).min(1, "at least one color"),
});

export const createProductSchema = productSchema.omit({ id: true });

export const updateProductSchema = productSchema.partial().omit({ id: true, created_at: true });