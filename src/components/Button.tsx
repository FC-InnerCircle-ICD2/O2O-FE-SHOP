import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap", {
  variants: {
    variant: {
      default: "bg-primary text-white hover:bg-primary/90 w-full px-4 py-2",
      primaryFit: "w-fit px-4 py-2 text-primary border-solid border border-primary",
      grayFit: "w-fit px-4 py-2 text-gray-400 border-solid border border-gray-400",
    },

    size: {
      default: "rounded-[8px] text-2xl h-10",
      s: "rounded-[6px] text-xl h-8",
      m: "rounded-[6px] text-2xl h-12",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
