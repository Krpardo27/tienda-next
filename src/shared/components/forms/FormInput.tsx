import { InputHTMLAttributes } from "react";
import clsx from "clsx";

type Props = InputHTMLAttributes<HTMLInputElement>;

export default function FormInput(props: Props) {
  const { className } = props;

  return (
    <input
      {...props}
      className={clsx(
        "w-full rounded-xl border border-zinc-300  px-4 py-3 text-sm outline-hidden transition placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200",
        className,
      )}
    />
  );
}
