import { LabelHTMLAttributes } from "react"
import clsx from 'clsx'

type Props = LabelHTMLAttributes<HTMLLabelElement>

export default function FormLabel(props: Props) {

  const { children, className } = props

  return (
    <label {...props} className={clsx("my-2 block text-sm font-medium text-zinc-700", className)}>{children}</label>
  )
}
