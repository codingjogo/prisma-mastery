"use client";

import React from "react";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TCreateProduct } from "@/lib/types";
import { PlusCircle, Trash2 } from "lucide-react";
import { z } from "zod";
import ProductImageUploader from "./product-image-uploader";
import { productCreateSchema } from "@/lib/schemas/product";

const ProductCreateForm = () => {
	// 1. Define your form.
	const form = useForm<TCreateProduct>({
		resolver: zodResolver(productCreateSchema),
		defaultValues: {
			name: "test-name",
			description: "test-description",
			price: 10.99,
			code: "test-code",
			ProductVariantColor: [
				{
					color: "red",
					images: [],
				},
			],
		},
	});

	// 2. Define a submit handler.
	async function onSubmit(values: TCreateProduct) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		try {
			await axios.post("/api/admin/inventory", values);
			console.log("Success Created");
			form.reset();
		} catch (error) {
			if (error instanceof z.ZodError) {
				console.log("[ADMIN_INVENTORY_POST]: " + error);
			}
			console.log("FAILD TO CREATE_AXIOS");
		}
	}

	function onError(error: any) {
		console.log("Form errors:", error);
	}

	const {
		fields: variantColorFields,
		append: variantColorAppend,
		remove: variantColorRemove,
	} = useFieldArray({
		control: form.control,
		name: "ProductVariantColor",
	});

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit, onError)}
				className="space-y-8"
			>
				{/* Name */}
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input placeholder="Name" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Description */}
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Input placeholder="Description" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Price */}
				<FormField
					control={form.control}
					name="price"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Price</FormLabel>
							<FormControl>
								<Input
									placeholder="Price"
									{...field}
									onChange={(e) =>
										field.onChange(Number(e.target.value))
									}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Code */}
				<FormField
					control={form.control}
					name="code"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Code</FormLabel>
							<FormControl>
								<Input placeholder="Code" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="border rounded-md shadow-sm p-6">
					{variantColorFields.map((v_color, v_colorIdx) => {
						return (
							<div key={v_color.id}>
								{/* Images */}
								<div>
									<ProductImageUploader
										form={form}
										colorIdx={v_colorIdx}
									/>
								</div>
								<div className="flex items-center gap-2">
									{/* Color */}
									<FormField
										control={form.control}
										name={`ProductVariantColor.${v_colorIdx}.color`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Color</FormLabel>
												<FormControl>
													<div className="flex gap-2">
														<Input
															placeholder="Color"
															{...field}
														/>
														{v_colorIdx !== 0 && (
															<Button
																variant={
																	"destructive"
																}
																type="button"
																onClick={() =>
																	variantColorRemove(
																		v_colorIdx
																	)
																}
															>
																<Trash2 className="w-4 h-4" />
															</Button>
														)}
													</div>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									{variantColorFields.length - 1 ===
										v_colorIdx && (
										<Button
											type="button"
											onClick={() =>
												variantColorAppend({
													color: "",
													images: []
												})
											}
										>
											<PlusCircle className="w-4 h-4 mr-2" />
											Add Color
										</Button>
									)}
								</div>
							</div>
						);
					})}
				</div>

				<div className="flex gap-2">
					<Button type="button" variant={"secondary"}>
						Cancel
					</Button>
					<Button type="submit">Create product</Button>
				</div>
			</form>
		</Form>
	);
};

export default ProductCreateForm;
