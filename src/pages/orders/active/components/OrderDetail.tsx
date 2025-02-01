import { Separator } from "@/components/shadcn/separator"
import { useEffect, useRef } from "react"
import { useActiveOrder } from "../contexts/OrderActiveProvider"
import OrderMenuItem from "./OrderMenuItem"
import { Button } from "@/components/Button"
import { approveOrder, refuseOrder } from "@/apis/order"

// TODO: 실제 주문 데이터 사용하도록 수정
const OrderDetail = () => {
  const { order, refuse, approve } = useActiveOrder()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0
    }
  }, [order])

  const handleClickRefuseButton = async () => {
    if (!order) return
    const { success } = await refuseOrder(order?.id)
    if (success) refuse(order.id)
  }
  const handleClickApproveButton = async () => {
    if (!order) return
    const { success } = await approveOrder(order.id)
    if (success) approve(order.id)
  }

  if (!order)
    return (
      <div className="flex flex-col items-center justify-center flex-1 bg-white text-lg font-bold">
        주문을 선택해주세요
      </div>
    )

  return (
    <div
      ref={containerRef}
      className="flex flex-col flex-1 w-full bg-white overflow-x-auto overflow-y-auto light-scrollbar pb-8"
    >
      <div className="min-w-[650px]">
        <Separator orientation="horizontal" className="bg-primary h-1" />
        {/* header */}
        <div className="flex w-full px-[30px] py-[20px] justify-between border-b border-b-slate-500">
          <div className="flex flex-col gap-2">
            <p className="text-2xl font-bold text-primary">배달 {order?.id}</p>
            <p className="text-lg font-bold text-black">{order?.name}</p>
          </div>
          <div className="flex gap-3 items-center">
            <Button variant={"outlined"} onClick={handleClickRefuseButton}>
              거부
            </Button>
            <Button color={"primary"} onClick={handleClickApproveButton}>
              접수
            </Button>
          </div>
        </div>
        {/* 요청사항 */}
        <div className="flex flex-col">
          <div className="flex h-[60px] items-center text-lg font-bold border-b-[1px] border-b-slate-300 px-[30px]">
            요청사항
          </div>
          <div className="flex flex-col gap-6 px-[30px] py-4">
            <div className="flex gap-10 items-start">
              <p className="text-lg w-[100px] font-bold">사장님께</p>
              <p className="text-lg flex-1 font-medium text-zinc-700">맵지 않게 해주세요.</p>
            </div>
            <div className="flex gap-10 items-start">
              <p className="text-lg w-[100px] font-bold">라이더님께</p>
              <p className="text-lg flex-1 font-medium text-zinc-700">안전하게 와주세요.</p>
            </div>
          </div>
        </div>
        <Separator className="h-3 bg-zinc-100" />
        {/* 주문 정보 */}
        <div className="flex flex-col">
          <div className="flex h-[60px] items-center justify-between text-lg font-bold border-b-[1px] border-b-slate-300 px-[30px]">
            <span>주문정보</span>
            <span className="text-base text-zinc-00">{order.time}</span>
          </div>
          <div className="px-[30px]">
            <OrderMenuItem
              className="text-lg font-bold border-b py-4 mb-2"
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
              className="text-lg font-bold border-t py-4 mt-2"
              menuItem={{ name: "상품합계", price: 19000, quantity: 4 }}
              isMainMenu
            />
          </div>
        </div>
        <Separator className="h-3 bg-zinc-100" />
        {/* 주문자 정보 */}
        <div className="flex flex-col">
          <div className="flex h-[60px] items-center text-lg font-bold border-b-[1px] border-b-slate-300 px-[30px]">
            주문자 정보
          </div>
          <div className="flex flex-col gap-6 px-[30px] py-4">
            <dl className="flex gap-10">
              <dt className="text-lg w-[100px] font-bold">주문자</dt>
              <dd className="text-lg font-medium text-zinc-700">홍길동</dd>
            </dl>
            <dl className="flex gap-10">
              <dt className="text-lg w-[100px] font-bold">주소</dt>
              <dd className="text-lg font-medium text-zinc-700">서울시 강남구 역삼동</dd>
            </dl>
            <dl className="flex gap-10">
              <dt className="text-lg w-[100px] font-bold">휴대폰번호</dt>
              <dd className="text-lg font-medium text-zinc-700">010-xxxx-5678</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetail
