import { cn } from "@/components/ui/lib/utils"
import { Order, useActiveOrder } from "../contexts/OrderActiveProvider"

const OrderList = () => {
  const { setCurrentOrder, newOrders, processingOrders, order } = useActiveOrder()

  return (
    <div className="flex flex-col h-full w-[350px] bg-sidebar overflow-y-auto dark-scrollbar">
      <OrderMenu name="신규" count={newOrders.length}>
        {newOrders.map((item) => (
          <OrderItem
            key={item.id}
            order={item}
            onClick={() => setCurrentOrder(item)}
            isActive={order?.id === item.id}
          />
        ))}
      </OrderMenu>
      <OrderMenu name="진행" count={processingOrders.length}>
        {processingOrders.map((item) => (
          <OrderItem
            key={item.id}
            order={item}
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
      >
        <p className="flex items-center gap-2">
          <span className="text-2xl">{`${name}`}</span>
          <span className="text-[#4BB6FF] text-3xl">{`${count}건`}</span>
        </p>
      </li>
      {children}
    </ul>
  )
}

const OrderItem = ({
  order,
  onClick,
  isActive,
}: {
  order: Order
  onClick: () => void
  isActive: boolean
}) => {
  return (
    <li
      className={cn(
        "flex items-start w-full cursor-pointer",
        "border-b border-[#222222]",
        isActive ? "bg-[#2395FF]" : "bg-[#1A1A1A]",
      )}
      onClick={onClick}
    >
      <div className="flex flex-col w-full py-4 px-5">
        {/* 주문 ID */}
        <div className="text-3xl text-white font-bold mb-2">{`배달 ${order.id}`}</div>

        {/* 주문 시간 */}
        <div className="text-xl text-zinc-200 mb-0.5">{order.orderTime}</div>

        {/* 주문 내역 */}
        <span className="text-2xl text-zinc-200">{order.desc}</span>
      </div>
    </li>
  )
}

export default OrderList
