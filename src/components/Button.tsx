import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
  {
    variants: {
      variant: {
        contained: "",
        text: "",
        outlined: "",
      },
      color: {
        primary: "",
        default: "",
      },
      size: {
        large: "h-14 rounded-[8px] text-2xl px-6",
        medium: "h-10 rounded-[6px] text-lg px-4",
        small: "h-8 rounded-[4px] text-sm px-2",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "contained",
        color: "primary",
        className: "bg-primary text-white hover:bg-primary/90",
      },
      {
        variant: "contained",
        color: "default",
        className: "bg-gray-800 text-white hover:bg-gray-700",
      },
      {
        variant: "text",
        color: "primary",
        className: "text-primary hover:bg-primary/10 bg-transparent",
      },
      {
        variant: "text",
        color: "default",
        className: "text-gray-800 hover:bg-gray-200 bg-transparent",
      },
      {
        variant: "outlined",
        color: "primary",
        className: "border border-primary text-primary hover:bg-primary/10 bg-transparent",
      },
      {
        variant: "outlined",
        color: "default",
        className: "border border-gray-400 text-gray-800 hover:bg-gray-200 bg-transparent",
      },
    ],
    defaultVariants: {
      variant: "contained",
      color: "default",
      size: "medium",
      fullWidth: false,
    },
  },
)

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, color, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, color, size, fullWidth, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button }
