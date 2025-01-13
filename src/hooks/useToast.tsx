import { Button } from "@/components/Button"
import { Separator } from "@/components/ui/separator"
import { useCallback, useRef } from "react"
import { toast } from "sonner"

export const useToast = () => {
  const toastId = useRef<number>(1)

  const showNewOrderNotification = useCallback(() => {
    const id = toastId.current++

    toast(
      () => (
        <div className="relative flex flex-col cursor-pointer w-full">
          <div
            className="flex flex-col flex-1 w-full"
            onClick={() => {
              toast.dismiss(id)
            }}
          >
            <div className="flex h-[6rem] px-[3rem] bg-black items-center justify-between max-w-full">
              <p className="text-3xl text-white font-bold">신규 주문</p>
              <p className="text-lg text-netural/80">주문일시: 2025-01-01 12:00:00</p>
            </div>
            <div className="flex flex-col py-[1.8rem] px-[3rem] bg-white">
              <div className="flex flex-col gap-[1.5rem]">
                <div className="text-2xl font-bold">주문 번호 #1078</div>
                <div className="flex">
                  <p className="text-xl font-bold">삼겹살 구이삼겹살 구이삼겹살 구이 외 2건</p>
                  <Separator className="mx-2 h-[10px] bg-textLight" orientation="vertical" />
                  <p className="text-xl flex-1 font-bold truncate">총 금액 10,000원 (결제완료)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        duration: Infinity,
      },
    )
  }, [])

  return { showNewOrderNotification }
}
