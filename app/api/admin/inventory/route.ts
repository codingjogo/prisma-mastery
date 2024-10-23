import prisma from "@/lib/db";
import { productCreateSchema } from "@/lib/schemas/product";
import { z } from "zod";

export async function POST(request: Request) {
	try {
		const json = await request.json();

		const validatedData = productCreateSchema.parse(json);

		const newProduct = await prisma.product.create({
			data: {
				name: validatedData.name,
				price: validatedData.price,
				code: validatedData.code,
				description: validatedData.description,
				ProductVariantColor: {
					create: validatedData.ProductVariantColor?.map(
						(v_color) => ({
							color: v_color.color || "",
							images: v_color.images || [],
						})
					),
				},
			},
			include: {
				ProductVariantColor: true,
			},
		});

		return Response.json(newProduct, { status: 201 });
	} catch (error) {
		if (error instanceof z.ZodError) {
			console.log("[ADMIN_INVENTORY_POST]: " + error);
		}
		console.log("[ADMIN_INVENTORY_POST]: " + error);
	}
}