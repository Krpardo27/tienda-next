"use client";

import { updateProduct } from "@/actions/update-product-action";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import { ProductSchema } from "../../../features/admin/schema";

export default function EditProductForm({
  children,
}: {
  children?: React.ReactNode;
}) {
  const router = useRouter();
  const params = useParams();
  const id = params.id?.toString() ?? "";

  const handleSubmit = async (formData: FormData) => {
    const data = {
      name: formData.get("name")?.toString() || "",
      price: Number(formData.get("price")),
      categoryId: formData.get("categoryId")?.toString() || "",
      description: formData.get("description")?.toString() || "",
      image: formData.get("image")?.toString() || "",
      isPopular: formData.get("isPopular") === "on",
      available: formData.get("available") === "on",
    };

    const result = ProductSchema.safeParse(data);

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }

    const response = await updateProduct(result.data, id);

    if (response?.errors) {
      response.errors.forEach((issue) => toast.error(issue.message));
      return;
    }

    toast.success("Producto actualizado correctamente");
    router.push("/dashboard/products");
  };

  return (
    <div className="mt-10
        max-w-3xl mx-auto
        border border-[var(--border)]
        bg-white 
        text-[var(--foreground)]
        px-6 py-8
        shadow-sm
        transition-colors duration-300">
      <form action={handleSubmit} className="space-y-5">
        {children}
        <input
          type="submit"
          value="Guardar cambios"
          className="bg-amber-400 text-white py-2 px-4 rounded-md hover:bg-amber-500 w-full cursor-pointer hover:shadow-md transition"
        />
      </form>
    </div>
  );
}
