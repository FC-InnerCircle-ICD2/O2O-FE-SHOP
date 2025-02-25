import { Order } from "@/types/models"
import { ROUTES } from "@/utils/routes"
import { useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export const useToast = () => {
  const navigate = useNavigate()
  const showNewOrderNotification = useCallback((order: Order) => {
    toast(
      () => (
        <div
          className="relative flex flex-col cursor-pointer w-full rounded-2xl"
          onClick={() => navigate(`${ROUTES.ACTIVE_ORDER}?orderId=${order.id}`)}
        >
          <div
            className="flex flex-col flex-1 w-full"
            onClick={() => {
              toast.dismiss(order.id)
            }}
          >
            <div className="flex px-7 py-5 bg-black items-center justify-between max-w-full rounded-t-2xl">
              <p className="text-base text-white font-bold">신규 주문</p>
            </div>
            <div className="flex flex-col px-7 py-5 bg-white rounded-b-2xl">
              <div className="flex flex-col gap-5">
                <p className="text-lg font-medium">{order.name}</p>
                <p className="text-lg flex-1 font-medium truncate">총 금액 {order.totalPrice}원</p>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        id: order.id,
        duration: Infinity,
        className: "rounded-2xl",
      },
    )
  }, [])

  const showNotification = useCallback((type: "success" | "error", message: string) => {
    toast(
      () => (
        <div className="relative flex flex-col w-full rounded-md">
          <div
            className={`flex px-7 py-5 border-l-8 ${
              type === "success" ? "border-green-500" : "border-red-500"
            } items-center justify-between max-w-full`}
          >
            <p className="text-base font-bold whitespace-pre-line">{message}</p>
          </div>
        </div>
      ),
      {
        duration: 3000,
        className: "rounded-md",
      },
    )
  }, [])

  return { showNewOrderNotification, showNotification }
}
