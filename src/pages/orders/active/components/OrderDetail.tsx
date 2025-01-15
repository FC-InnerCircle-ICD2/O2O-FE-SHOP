import { Separator } from "@/components/ui/separator"
import { useActiveOrder } from "../contexts/OrderActiveProvider"
import { Button } from "@/components/Button"
import { useEffect, useState } from "react"
import Icon from "@/components/Icon"
import OrderMenuItem from "./OrderMenuItem"

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
      {/* header */}
      <div className="flex w-full px-[30px] py-[20px] justify-between border-b border-b-slate-500">
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
      {/* 주문 정보 */}
      <div className="flex flex-col">
        <div className="flex h-[60px] items-center text-2xl font-bold border-b-[1px] border-b-slate-300 px-[30px]">
          주문정보
        </div>
        <div className="px-[30px]">
          <OrderMenuItem
            className="text-2xl font-bold border-b py-4 mb-2"
            menuItem={{ name: "상품", price: "금액", quantity: "수량" }}
            isMainMenu
          />

          <OrderMenuItem menuItem={{ name: "주방 세제", price: 18000, quantity: 3 }} isMainMenu />
          <OrderMenuItem menuItem={{ name: "표준형", price: 6000, quantity: 1 }} />
          <OrderMenuItem menuItem={{ name: "저절임류", price: 6000, quantity: 1 }} />
          <OrderMenuItem menuItem={{ name: "고본량", price: 6000, quantity: 1 }} />

          <OrderMenuItem menuItem={{ name: "항균 봉투", price: 1000, quantity: 1 }} isMainMenu />
          <OrderMenuItem menuItem={{ name: "봉투", price: 1000, quantity: 1 }} />

          <OrderMenuItem
            className="text-2xl font-bold border-t py-4 mt-2"
            menuItem={{ name: "상품합계", price: 19000, quantity: 4 }}
            isMainMenu
          />
        </div>
      </div>
      <Separator className="h-3 bg-zinc-100" />
    </div>
  )
}

export default OrderDetail
