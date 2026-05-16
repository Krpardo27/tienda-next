"use client";

import { InputHTMLAttributes } from "react";
import clsx from "clsx";
import { FiSearch, FiX } from "react-icons/fi";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  onClear?: () => void;
};

export default function FormInputSearch(props: Props) {
  const { className, value, onClear, ...rest } = props;

  const hasValue =
    typeof value === "string" && value.length > 0;

  return (
    <div className="relative w-full">
      {/* Search Icon */}
      <FiSearch
        size={18}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
      />

      <input
        {...rest}
        value={value}
        className={clsx(
          `
            w-full
            rounded-xl
            border
            border-zinc-300
            
            bg-white
            
            text-zinc-900
            
            py-3
            pl-11
            pr-11
            text-sm
            outline-hidden
            transition
            placeholder:text-zinc-400
            
            focus:border-amber-400
            focus:ring-4
            focus:ring-amber-100
            
          `,
          className,
        )}
      />

      {/* Clear Button */}
      {hasValue && onClear && (
        <button
          type="button"
          onClick={onClear}
          className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            rounded-full
            p-1
            text-zinc-400
            transition
            hover:bg-zinc-100
            hover:text-zinc-700
          "
        >
          <FiX size={16} />
        </button>
      )}
    </div>
  );
}