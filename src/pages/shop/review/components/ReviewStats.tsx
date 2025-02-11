import { Progress } from "@/components/shadcn/progress"
import { ReviewRatings } from "@/types/models"
import { useState } from "react"

const StatItem = ({ title, value }: { title: string; value: number }) => (
  <div className="shrink-0 flex items-center">
    <span className="text-gray-700 text-lg   mr-2">{title}</span>
    <span className="text-lg font-bold mr-2">{value}</span>
    <Progress style={{ flexShrink: 0, width: "100px" }} value={(value / 5) * 100} />
  </div>
)
export const ReviewStats = () => {
  const [stats, setStats] = useState<ReviewRatings>({
    total: 4.3,
    quantity: 4.3,
    taste: 3.2,
    delivery: 5.0,
  })

  return (
    <div className="p-8">
      <h2 className="mb-2 text-lg">전체 별점</h2>
      <div className="flex items-center gap-2 mb-4">
        <div className="text-xl font-bold">4.3</div>
        <div className="text-xl font-bold">별별별별별</div>
        <div className="text-lg">{"(총 리뷰 1,111개)"}</div>
      </div>
      <div className="flex gap-8 flex-wrap">
        <StatItem title="양" value={stats.quantity} />
        <StatItem title="맛" value={stats.taste} />
        <StatItem title="배달" value={stats.delivery} />
      </div>
    </div>
  )
}
