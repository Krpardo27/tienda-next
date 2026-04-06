import { FormHTMLAttributes } from "react";
import clsx from "clsx";

type Props = FormHTMLAttributes<HTMLFormElement>;

export default function Form(props: Props) {
  const { children, className } = props;

  return (
    <form
      {...props}
      className={clsx(
        "w-full max-w-md mx-auto",
        "flex flex-col",
        "rounded-2xl ",
        "bg-white dark:bg-zinc-900",
        "shadow-sm",
        "p-6 md:p-8",
        "space-y-6",
        "transition-all duration-200",
        className
      )}
    >
      {children}
    </form>
  );
}
