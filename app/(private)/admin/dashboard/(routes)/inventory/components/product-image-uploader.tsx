import { TCreateProduct } from "@/lib/types";
import React from "react";
import { useFieldArray, UseFormReturn, useWatch } from "react-hook-form";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { FormLabel } from "@/components/ui/form";

const ProductImageUploader = ({
	form,
	colorIdx,
}: {
	form: UseFormReturn<TCreateProduct>;
	colorIdx: number;
}) => {
	const imagesFields =
		useWatch({
			control: form.control,
			name: `ProductVariantColor.${colorIdx}.images`,
		}) ?? [];

	const {
		fields: colorImagesFields,
		append: colorImagesAppend,
		remove: colorImagesRemove,
	} = useFieldArray({
		control: form.control,
		name: `ProductVariantColor.${colorIdx}.images`,
	});
	return (
		<div className="flex flex-col gap-4">
			<CldUploadWidget
				uploadPreset={"pnfjb4bt"}
				onSuccess={(result: any) => {
					colorImagesAppend(result.info.public_id);
				}}
			>
				{({ open }) => {
					return (
						<>
							<FormLabel>Images</FormLabel>
							<Button type="button" onClick={() => open()}>
								Upload an Image
							</Button>
						</>
					);
				}}
			</CldUploadWidget>

			<div className="flex gap-2">
				{colorImagesFields.map((image, imageIdx) => {
					return (
						<div key={image.id} className="relative w-12 h-12">
							<Button
								type="button"
								onClick={() => colorImagesRemove(imageIdx)}
								className="absolute top-2 right-2"
								variant={"destructive"}
							>
								<Trash2 className="w-4 h-4" />
							</Button>
							<CldImage
								width="128"
								height="128"
								src={imagesFields[imageIdx]}
								sizes="100vw"
								alt="Description of my image"
							/>
							{/* <Image
								alt="Mountains"
								src={imagesFields ? imagesFields[imageIdx] : ""}
								fill
								sizes="(min-width: 808px) 50vw, 100vw"
								style={{
									objectFit: "cover", // cover, contain, none
								}}
							/> */}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default ProductImageUploader;
