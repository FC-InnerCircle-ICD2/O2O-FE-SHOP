import { ReviewStats as TReviewStats } from "@/types/models"
import { useState } from "react"

const StatItem = ({ title, value }: { title: string; value: number }) => (
  <div className="flex flex-col items-center">
    <span className="text-lg font-bold">{title}</span>
    <span className="text-lg">{value}</span>
  </div>
)

export const ReviewStats = () => {
  const [stats, setStats] = useState<TReviewStats>({ quantity: 0, taste: 0, delivery: 0 })
  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold mb-2">리뷰 통계</h2>
      <div className="flex gap-4">
        <StatItem title="양" value={stats.quantity} />
        <StatItem title="맛" value={stats.taste} />
        <StatItem title="배달" value={stats.delivery} />
      </div>
    </div>
  )
}
