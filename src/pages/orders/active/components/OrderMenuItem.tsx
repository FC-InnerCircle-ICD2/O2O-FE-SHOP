import { cn } from "@/components/ui/lib/utils"
import React from "react"

interface MenuItem {
  name: string
  price: number | string
  quantity: number | string
}

interface OrderMenuItemProps {
  menuItem: MenuItem
  className?: string
  isMainMenu?: boolean
}

const OrderMenuItem = ({ className, menuItem, isMainMenu = false }: OrderMenuItemProps) => {
  return (
    <div
      className={cn(
        "font-medium grid grid-cols-order py-1",
        isMainMenu ? "text-2xl" : "text-xl text-zinc-400",
        className,
      )}
    >
      <div className={cn(!isMainMenu && "pl-3")}>{`${!isMainMenu ? "└" : ""} ${
        menuItem.name
      }`}</div>
      <div className="text-right">
        {typeof menuItem.quantity === "number"
          ? menuItem.quantity.toLocaleString()
          : menuItem.quantity}
      </div>
      <div className="text-right">
        {typeof menuItem.price === "number"
          ? menuItem.price.toLocaleString() + "원"
          : menuItem.price}
      </div>
    </div>
  )
}

export default OrderMenuItem
