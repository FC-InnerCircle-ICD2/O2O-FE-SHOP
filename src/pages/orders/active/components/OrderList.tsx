import { cn } from "@/lib/utils"
import { useActiveOrder } from "../contexts/OrderActiveProvider"
import { useNavigate } from "react-router-dom"
import { Order } from "@/types/models"

const OrderList = () => {
  const { newOrders, processingOrders } = useActiveOrder()

  return (
    <div className="flex flex-col h-full w-[350px] bg-sidebar overflow-y-auto dark-scrollbar">
      <OrderMenu name="신규" orders={newOrders}></OrderMenu>
      <OrderMenu name="진행" orders={processingOrders}></OrderMenu>
    </div>
  )
}

const OrderMenu = ({ name, orders }: { name: string; orders: Order[] }) => {
  const navigate = useNavigate()
  const { order } = useActiveOrder()
  return (
    <ul>
      <li
        className={cn("flex items-center w-full h-[52px] px-5 text-white font-bold bg-[#2E2E39]")}
      >
        <p className="flex items-center gap-2">
          <span className="text-lg">{`${name}`}</span>
          <span className="text-[#4BB6FF] text-lg">{`${orders.length}건`}</span>
        </p>
      </li>
      {orders.map((item) => (
        <OrderItem
          key={item.id}
          order={item}
          onClick={() => navigate(`/orders/active?orderId=${item.id}`)}
          isActive={order?.id === item.id}
        />
      ))}
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
        <div className="text-lg text-white font-bold mb-2">{`배달 ${order.id}`}</div>

        {/* 주문 시간 */}
        <div className="text-base text-zinc-200 mb-0.5">{order.time}</div>

        {/* 주문 내역 */}
        <span className="text-lg text-zinc-200">{order.name}</span>
      </div>
    </li>
  )
}

export default OrderList
