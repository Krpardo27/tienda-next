"use client";

import FormInputSearch from "@/src/shared/components/forms/FormInputSearch";


type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function ProductSearchForm({
  value,
  onChange,
}: Props) {
  return (
    <div className="w-full max-w-md">
      <FormInputSearch
        value={value}
        placeholder="Buscar productos..."
        onChange={(e) => onChange(e.target.value)}
        onClear={() => onChange("")}
      />
    </div>
  );
}