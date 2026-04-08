"use client";

import { updateProduct } from "@/actions/update-product-action";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import { ProductSchema } from "../admin/schema";

export default function EditProductForm({
  children,
}: {
  children?: React.ReactNode;
}) {
  const router = useRouter();
  const params = useParams();
  const id = +params.id!

  const handleSubmit = async (formData: FormData) => {
    // console.log('desde handleSubmit');
    const data = {
      name: formData.get("name")?.toString() || "",
      price: Number(formData.get("price")),
      categoryId: Number(formData.get("categoryId")),
      description: formData.get("description")?.toString() || "",
      image: formData.get("image")?.toString() || "",
    };

    const result = ProductSchema.safeParse(data);
    // console.log(result);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }
    // console.log(result.data);
    const response = await updateProduct(result.data, id);
    // console.log(response);
    if (response?.errors) {
      response.errors.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }
    toast.success("Producto actualizado correctamente");
    router.push("/admin/products");
  };

  return (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto">
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
