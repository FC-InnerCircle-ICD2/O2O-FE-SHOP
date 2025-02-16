import { Card } from "@/components/shadcn/card"
import { Separator } from "@/components/shadcn/separator"

const SalesSummary = () => {
  return (
    <Card className="grid grid-cols-[1fr_1px_1fr_1px_1fr_1px_1fr_1px_1fr] bg-white py-4 px-6 rounded-lg">
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center">
          <p className="text-2xl font-semibold">
            100,000<span className="text-base ml-[0.1rem]">원</span>
          </p>
          <p className="text-sm text-gray-500">총 매출액</p>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Separator className="h-[70%] bg-gray-400" orientation="vertical" />
      </div>
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center">
          <p className="text-2xl font-semibold">
            32,000<span className="text-base ml-[0.1rem]">원</span>
          </p>
          <p className="text-sm text-gray-500">평균 매출액</p>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Separator className="h-[70%] bg-gray-400" orientation="vertical" />
      </div>
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center">
          <p className="text-2xl font-semibold">
            100,000<span className="text-base ml-[0.1rem]">원</span>
          </p>
          <p className="text-sm text-gray-500">시간대별 평균 매출</p>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Separator className="h-[70%] bg-gray-400" orientation="vertical" />
      </div>
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center">
          <p className="text-2xl font-semibold">
            100,000<span className="text-base ml-[0.1rem]">원</span>
          </p>
          <p className="text-sm text-gray-500">일 평균 매출</p>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Separator className="h-[70%] bg-gray-400" orientation="vertical" />
      </div>
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center">
          <p className="text-2xl font-semibold">
            15<span className="text-base ml-[0.1rem]">%</span>
          </p>
          <p className="text-sm text-gray-500">전년동기대비</p>
        </div>
      </div>
    </Card>
  )
}

export default SalesSummary
