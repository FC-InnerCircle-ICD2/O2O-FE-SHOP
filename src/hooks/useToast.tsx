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
          <div className="absolute -top-[1rem] -left-[1rem] w-2 h-2 bg-red-500 rounded-full animate-blink" />
          <div
            className="flex flex-col flex-1 w-full"
            onClick={() => {
              toast.dismiss(id)
            }}
          >
            <div className="flex flex-1 items-center justify-between">
              <p className="text-2xl text-primary font-bold">새로운 주문 접수</p>
              <p className="text-base text-muted-foreground">주문일시: 2025-01-01 12:00:00</p>
            </div>
            <Separator className="my-2" />
            <div className="flex flex-col flex-1 gap-0.5">
              <div className="text-xl">주문 번호 #1078</div>
              <div className="flex flex-1 items-center text-xl">
                <span className="text-xl font-bold">메뉴 2개</span>
                <Separator className="mx-2 h-[10px] bg-textLight" orientation="vertical" />
                <span className="text-xl font-bold">총 금액 10,000원</span>
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
