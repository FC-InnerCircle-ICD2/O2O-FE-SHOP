import { ROUTES } from "@/routes"
import { useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export const useToast = () => {
  const navigate = useNavigate()
  const showNewOrderNotification = useCallback((id: string) => {
    toast(
      () => (
        <div
          className="relative flex flex-col cursor-pointer w-full rounded-2xl"
          onClick={() => navigate(`${ROUTES.ACTIVE_ORDER}?orderId=${id}`)}
        >
          <div
            className="flex flex-col flex-1 w-full"
            onClick={() => {
              toast.dismiss(id)
            }}
          >
            <div className="flex px-7 py-5 bg-black items-center justify-between max-w-full rounded-t-2xl">
              <p className="text-base text-white font-bold">신규 주문</p>
              <p className="text-base text-netural/80">#1078</p>
            </div>
            <div className="flex flex-col px-7 py-5 bg-white rounded-b-2xl">
              <div className="flex flex-col gap-5">
                <p className="text-lg font-medium">삼겹살 구이삼겹살 구이삼겹살 구이 외 2건</p>
                <p className="text-lg flex-1 font-medium truncate">총 금액 10,000원 (결제완료)</p>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        duration: Infinity,
        id,
        className: "rounded-2xl",
      },
    )
  }, [])

  return { showNewOrderNotification }
}
