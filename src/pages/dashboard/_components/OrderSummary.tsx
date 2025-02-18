import { Card } from "@/components/shadcn/card"
import { Separator } from "@/components/shadcn/separator"

const OrderSummary = () => {
  return (
    <Card className="grid grid-cols-[1fr_1px_1fr_1px_1fr_1px_1fr_1px_1fr] bg-white py-4 px-6 rounded-lg">
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center">
          <p className="text-2xl font-semibold">778</p>
          <p className="text-sm text-gray-500">총 주문수</p>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Separator className="h-[70%] bg-gray-400" orientation="vertical" />
      </div>
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center">
          <p className="text-2xl font-semibold">
            33<span className="text-base ml-[0.1rem]">건</span>
          </p>
          <p className="text-sm text-gray-500">일 평균 주문수</p>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Separator className="h-[70%] bg-gray-400" orientation="vertical" />
      </div>
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center">
          <p className="text-2xl font-semibold">5</p>
          <p className="text-sm text-gray-500">취소 주문</p>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Separator className="h-[70%] bg-gray-400" orientation="vertical" />
      </div>
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center">
          <p className="text-2xl font-semibold">2%</p>
          <p className="text-sm text-gray-500">주문취소율</p>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Separator className="h-[70%] bg-gray-400" orientation="vertical" />
      </div>
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center">
          <p className="text-2xl font-semibold">4.5</p>
          <p className="text-sm text-gray-500">평균 평점</p>
        </div>
      </div>
    </Card>
  )
}

export default OrderSummary
