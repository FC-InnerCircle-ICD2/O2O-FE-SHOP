"use client"

import { cva, VariantProps } from "class-variance-authority"

const labelVariants = cva("px-2 py-1 rounded-md text-sm w-fit", {
  variants: {
    status: {
      done: "bg-blue-500/80 text-white",
      refuse: "bg-red-600/90 text-white",
    },
  },
  defaultVariants: {},
})

interface LabelProps extends VariantProps<typeof labelVariants> {
  value: string
}

const Label = ({ status, value }: LabelProps) => {
  return <span className={labelVariants({ status })}>{value}</span>
}

export default Label
