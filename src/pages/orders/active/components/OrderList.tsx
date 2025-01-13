import { cn } from "@/components/ui/lib/utils"
import { useState } from "react"

const OrderList = () => {
  const [activeMenu, setActiveMenu] = useState<number>(0)

  return (
    <div className="flex flex-col w-[350px] bg-sidebar">
      <OrderMenu name="신규" count={2} isActive={activeMenu === 0} onClick={() => setActiveMenu(0)}>
        <OrderItem id={"A1B2"} desc="메뉴 2개, 총 2개  20,000원" />
        <OrderItem id={"A1B2"} desc="메뉴 2개, 총 2개  20,000원" />
      </OrderMenu>
      <OrderMenu name="완료" count={1} isActive={activeMenu === 1} onClick={() => setActiveMenu(1)}>
        <OrderItem id={"A1B2"} desc="메뉴 2개, 총 2개  20,000원" />
      </OrderMenu>
    </div>
  )
}

const OrderMenu = ({
  name,
  count,
  isActive,
  onClick,
  children,
}: {
  name: string
  count: number
  isActive?: boolean
  onClick: () => void
  children?: React.ReactNode
}) => {
  return (
    <ul>
      <li
        className={cn(
          "flex items-center w-full h-[52px] px-5 text-white font-bold bg-[#2E2E39] cursor-pointer",
          isActive && "bg-[#2395FF]",
        )}
        onClick={onClick}
      >{`${name} ${count}건`}</li>
      {children}
    </ul>
  )
}

const OrderItem = ({ id, desc }: { id: string; desc: string }) => {
  return (
    <li className="flex items-center w-full h-[108px] px-5 bg-[#161616] cursor-pointer">
      <div className="flex flex-col gap-5">
        <span className="text-3xl text-white font-bold">{`배달 ${id}`}</span>
        <span className="text-2xl text-white">{desc}</span>
      </div>
    </li>
  )
}

export default OrderList
