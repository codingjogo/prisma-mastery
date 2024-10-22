import React from "react";
import ProductEditForm from "../../components/product-edit-form";
import prisma from "@/lib/db";

const InventoryEditPage = async ({
	params,
}: {
	params: { productId: string };
}) => {
	const product = await prisma.product.findUnique({
		where: { id: params.productId },
		include: { ProductVariantColor: true },
	})?? {};

	return (
		<section>
			<ProductEditForm productId={params.productId} product={product} />
		</section>
	);
};

export default InventoryEditPage;
