import { Separator } from "@/components/shadcn/separator"
import { useEffect, useRef } from "react"
import { useActiveOrder } from "../contexts/OrderActiveProvider"
import OrderMenuItem from "./OrderMenuItem"
import { Button } from "@/components/Button"
import { approveOrder, completeOrder, refuseOrder } from "@/apis/order"
import { useToast } from "@/hooks/useToast"

const OrderDetail = () => {
  const { showNotification } = useToast()
  const { order, refuse, approve, complete } = useActiveOrder()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0
    }
  }, [order])

  const handleClickRefuseButton = async () => {
    if (!order) return
    const { success, message } = await refuseOrder(order?.id)
    if (success) {
      showNotification("success", "주문을 거부하였습니다")
      refuse(order.id)
    } else showNotification("error", message)
  }
  const handleClickApproveButton = async () => {
    if (!order) return
    const { success, message } = await approveOrder(order.id)
    if (success) {
      showNotification("success", "주문을 접수하였습니다")
      approve(order.id)
    } else showNotification("error", message)
  }
  const handleClickCompleteButton = async () => {
    if (!order) return
    const { success, message } = await completeOrder(order.id)
    if (success) {
      showNotification("success", "주문이 완료되었습니다")
      complete(order.id)
    } else showNotification("error", message)
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
            {order.status === "NEW" ? (
              <>
                {" "}
                <Button variant={"outlined"} onClick={handleClickRefuseButton}>
                  거부
                </Button>
                <Button color={"primary"} onClick={handleClickApproveButton}>
                  접수
                </Button>
              </>
            ) : (
              <Button color={"primary"} onClick={handleClickCompleteButton}>
                완료
              </Button>
            )}
          </div>
        </div>
        {/* 요청사항 */}
        {/* TODO: 중간발표 이후 주석 해제 */}
        <div className="flex flex-col">
          <div className="flex h-[60px] items-center text-lg font-bold border-b-[1px] border-b-slate-300 px-[30px]">
            요청사항
          </div>
          <div className="flex flex-col gap-6 px-[30px] py-4">
            <div className="flex gap-10 items-start">
              <p className="text-lg w-[100px] font-bold">사장님께</p>
              <p className="text-lg flex-1 font-medium text-zinc-700">
                수저, 포크 {order.excludingSpoonAndFork ? "X" : "O"}
              </p>
            </div>
            <div className="flex gap-10 items-start">
              <p className="text-lg w-[100px] font-bold">라이더님께</p>
              <p className="text-lg flex-1 font-medium text-zinc-700">{order.requestToRider}</p>
            </div>
          </div>
        </div>
        <Separator className="h-3 bg-zinc-100" />
        {/* 주문 정보 */}
        <div className="flex flex-col">
          <div className="flex h-[60px] items-center justify-between text-lg font-bold border-b-[1px] border-b-slate-300 px-[30px]">
            <span>주문정보</span>
          </div>
          <div className="px-[30px]">
            <OrderMenuItem
              className="text-lg font-bold border-b py-4 mb-2"
              menuItem={{ name: "상품", price: "금액", quantity: "수량" }}
              isMainMenu
            />
            {order.details.map((menu, index) => (
              <div key={index}>
                <OrderMenuItem
                  menuItem={{ name: menu.menuName, price: menu.price, quantity: 1 }}
                  isMainMenu
                />
                {menu.optionGroups.map((options, index) => (
                  <OrderMenuItem
                    key={index}
                    menuItem={{
                      name: `${options.name}(${options.options.length}) : ${options.options
                        .map((options) => options.name)
                        .join(", ")}`,
                      price: options.options
                        .map((option) => option.price)
                        .reduce((acc, cur) => acc + cur),
                      quantity: "",
                    }}
                  />
                ))}
              </div>
            ))}

            <OrderMenuItem
              className="text-lg font-bold border-t py-4 mt-2"
              menuItem={{
                name: "상품합계",
                price: order.totalPrice,
                quantity: order.details.length,
              }}
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
              <dd className="text-lg font-medium text-zinc-700">
                {order.address.road} {order.address.detail}
              </dd>
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
