'use client';

import { ProductSchema } from "@/src/schema";
import React from "react";
import { toast } from "react-toastify";

export default function AddProductForm({ children }: { children?: React.ReactNode }) {

  const handleSubmit = async (formData: FormData) => {
    // console.log('desde handleSubmit');
    const data = {
      name: formData.get('name')?.toString() || '',
      price: Number(formData.get('price')),
      categoryId: Number(formData.get('categoryId')),
    };

    const result = ProductSchema.safeParse(data);
    // console.log(result);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }
    console.log(result.data);
  }

  return (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto">
      <form action={handleSubmit} className="space-y-5">
        {children}
        <input
          type="submit"
          value="Registrar producto"
          className="bg-amber-400 text-white py-2 px-4 rounded-md hover:bg-amber-500 w-full cursor-pointer hover:shadow-md transition"
        />
      </form>
    </div>
  );
}
