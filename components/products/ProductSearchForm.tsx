'use client';

import { SearchProductSchema } from "@/src/schema";
import React from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function ProductSearchForm() {

  const router = useRouter();

  const handleSearchForm = (formData: FormData) => {
    const data = {
      search: formData.get('search')
    }

    const result = SearchProductSchema.safeParse(data);
    console.log(result);

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }
    router.push(`/admin/products/search?search=${result.data.search}`);
  }

  return (
    <form
      action={handleSearchForm} 
      className="flex items-center">
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Buscar producto..."
        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
      />

      <input
        type="submit"
        value="Buscar"
        className="bg-amber-400 text-white rounded-md px-4 py-2 ml-2 cursor-pointer"
      />
    </form>
  );
}
