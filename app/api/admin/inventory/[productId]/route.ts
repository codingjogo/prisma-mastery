import prisma from "@/lib/db";
import { updateProductSchema } from "@/lib/schemas/product";
import { z } from "zod";

export async function PUT(
	request: Request,
	{ params }: { params: { productId: string } }
) {
	try {
		const json = await request.json();

		const validatedData = updateProductSchema.parse(json);

		const updatedProduct = await prisma.product.update({
			where: { id: params.productId },
			data: {
				name: validatedData.name,
				price: validatedData.price,
				code: validatedData.code,
				description: validatedData.description,
				updated_at: new Date(),
				ProductVariantColor: {
					upsert: validatedData.ProductVariantColor?.map(
						(v_color) => ({
							where: { id: v_color.id },
							update: { color: v_color.color || ''},
							create: { color: v_color.color || ''},
						})
					),
				},
			},
			include: {
				ProductVariantColor: true,
			},
		});

		return Response.json(updatedProduct, { status: 201 });
	} catch (error) {
		if (error instanceof z.ZodError) {
			console.log("[ADMIN_INVENTORY_POST]: " + error);
		}
		console.log("[ADMIN_INVENTORY_POST]: " + error);
	}
}
