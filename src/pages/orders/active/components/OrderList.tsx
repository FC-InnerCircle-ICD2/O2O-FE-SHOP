import { cn } from "@/lib/utils"
import { OrderDto } from "@/types/dtos"
import { format } from "date-fns"
import { useNavigate } from "react-router-dom"
import { useActiveOrder } from "../contexts/OrderActiveProvider"

const OrderList = () => {
  const { newOrders, onGoingOrders } = useActiveOrder()

  return (
    <div className="flex flex-col h-full w-[350px] bg-sidebar overflow-y-auto dark-scrollbar">
      <OrderMenu name="신규" orders={newOrders}></OrderMenu>
      <OrderMenu name="진행" orders={onGoingOrders}></OrderMenu>
    </div>
  )
}

const OrderMenu = ({ name, orders }: { name: string; orders: OrderDto[] }) => {
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
          key={item.orderId}
          order={item}
          onClick={() => navigate(`/orders/active?orderId=${item.orderId}`)}
          isActive={order?.orderId === item.orderId}
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
  order: OrderDto
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
        <div className="text-lg text-white font-bold mb-2 truncate">{`새로운 주문 - ${order.orderId}`}</div>

        {/* 주문 내역 */}
        <span className="text-base text-zinc-100 font-medium">{order.orderName}</span>

        {/* 주문 시간 */}
        <div className="text-sm text-zinc-200 mb-0.5">
          {format(new Date(order.orderTime), "yyyy-MM-dd HH:mm")}
        </div>
      </div>
    </li>
  )
}

export default OrderList
