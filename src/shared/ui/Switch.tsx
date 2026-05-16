"use client";

import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useTransition } from "react";

type Props = {
  checked: boolean;
  onChange: (value: boolean) => Promise<void>;
  ariaLabel?: string;
};

export default function Switch({ checked, onChange, ariaLabel }: Props) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel ?? (checked ? "Desactivar producto" : "Activar producto")}
      onClick={() => startTransition(() => onChange(!checked))}
      disabled={isPending}
      className={`
        group relative inline-flex h-8 w-14 shrink-0 items-center rounded-full
        border transition-all duration-300 ease-out
        focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2
        ${checked ? "border-emerald-500 bg-emerald-500" : "border-rose-500 bg-red-500"}
        ${isPending ? "cursor-wait opacity-70" : "cursor-pointer"}
      `}
    >
      <span
        aria-hidden="true"
        className={`
          pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 transition-opacity duration-200
          ${checked ? "opacity-100" : "opacity-0"}
        `}
      >
        <CheckIcon className="h-3.5 w-3.5 text-emerald-100" />
      </span>

      <span
        aria-hidden="true"
        className={`
          pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 transition-opacity duration-200
          ${checked ? "opacity-0" : "opacity-100"}
        `}
      >
        <XMarkIcon className="h-3.5 w-3.5 text-white font-bold" />
      </span>

      <span
        className={`
          pointer-events-none relative inline-block h-6 w-6 rounded-full bg-white
          ring-1 ring-black/5 shadow-[0_2px_6px_rgba(0,0,0,0.2)]
          transition-all duration-300 ease-out
          ${checked ? "translate-x-7" : "translate-x-1"}
        `}
      >
        <span
          className={`
            absolute inset-0 m-auto h-2.5 w-2.5 rounded-full transition-colors
            ${checked ? "bg-emerald-500" : "bg-zinc-400"}
          `}
        />
      </span>
    </button>
  );
}