import { cn } from "@/components/ui/lib/utils"
import { useActiveOrder } from "../contexts/OrderActiveProvider"

const OrderList = () => {
  const { setCurrentOrder, newOrders, processingOrders, order } = useActiveOrder()

  return (
    <div className="flex flex-col w-[350px] bg-sidebar">
      <OrderMenu name="신규" count={newOrders.length}>
        {newOrders.map((item) => (
          <OrderItem
            key={item.id}
            id={item.id}
            desc={item.desc}
            onClick={() => setCurrentOrder(item)}
            isActive={order?.id === item.id}
          />
        ))}
      </OrderMenu>
      <OrderMenu name="진행" count={processingOrders.length}>
        {processingOrders.map((item) => (
          <OrderItem
            key={item.id}
            id={item.id}
            desc={item.desc}
            onClick={() => setCurrentOrder(item)}
            isActive={order?.id === item.id}
          />
        ))}
      </OrderMenu>
    </div>
  )
}

const OrderMenu = ({
  name,
  count,
  children,
}: {
  name: string
  count: number
  children?: React.ReactNode
}) => {
  return (
    <ul>
      <li
        className={cn("flex items-center w-full h-[52px] px-5 text-white font-bold bg-[#2E2E39]")}
      >{`${name} ${count}건`}</li>
      {children}
    </ul>
  )
}

const OrderItem = ({
  id,
  desc,
  onClick,
  isActive,
}: {
  id: string
  desc: string
  onClick: () => void
  isActive: boolean
}) => {
  return (
    <li
      className={cn(
        "flex items-center w-full h-[108px] px-5 cursor-pointer",
        isActive ? "bg-[#2395FF]" : "bg-[#161616]",
      )}
      onClick={onClick}
    >
      <div className="flex flex-col gap-5">
        <span className="text-3xl text-white font-bold">{`배달 ${id}`}</span>
        <span className="text-2xl text-white">{desc}</span>
      </div>
    </li>
  )
}

export default OrderList
