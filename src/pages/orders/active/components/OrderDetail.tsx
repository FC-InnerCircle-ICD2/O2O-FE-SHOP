import { Separator } from "@/components/ui/separator"
import { useActiveOrder } from "../contexts/OrderActiveProvider"
import { Button } from "@/components/Button"
import { useEffect, useState } from "react"
import Icon from "@/components/Icon"

const OrderDetail = () => {
  // 해당 page에서 orderId가 있으면 주문 상세 api 호출 예정
  const [orderTime, setOrderTime] = useState<number>(1)
  const { order } = useActiveOrder()

  useEffect(() => {
    setOrderTime(1)
  }, [order])

  if (!order) return <div className="flex flex-col flex-1 bg-white">주문을 선택해주세요.</div>

  return (
    <div className="flex flex-col flex-1 bg-white">
      <Separator orientation="horizontal" className="bg-primary h-1" />
      <div className="flex w-full px-[30px] py-[20px] justify-between border-b border-gray-300">
        <div className="flex flex-col gap-2">
          <p className="text-4xl font-bold text-primary">배달 {order?.id}</p>
          <p className="text-3xl font-bold text-black">{order?.desc}</p>
        </div>
        <div className="flex gap-3 items-center">
          <Button variant="grayFit">거부</Button>
          <div className="flex flex-1 min-w-[150px] gap-2 items-center border border-black rounded-[6px] px-3 py-2">
            <div
              className="cursor-pointer"
              onClick={() => {
                if (orderTime <= 1) return

                setOrderTime(orderTime - 1)
              }}
            >
              <Icon name="Minus" size={20} />
            </div>
            <p className="flex flex-1 whitespace-nowrap text-2xl justify-center">{`${
              orderTime * 5
            }~${orderTime * 5 + 5}분`}</p>
            <div className="cursor-pointer" onClick={() => setOrderTime(orderTime + 1)}>
              <Icon name="Plus" size={20} />
            </div>
          </div>
          <Button>접수</Button>
        </div>
      </div>
    </div>
  )
}

export default OrderDetail
