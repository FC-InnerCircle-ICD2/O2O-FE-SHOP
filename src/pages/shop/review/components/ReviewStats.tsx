import { Progress } from "@/components/shadcn/progress"
import { ReviewRatings } from "@/types/models"
import { Star } from "lucide-react"
import { useState } from "react"

interface StarRatingProps {
  rating: number
  size?: number
  color?: string
}

const StarRating = ({ rating, size = 24, color = "#FFD700" }: StarRatingProps) => {
  const stars = []
  const fullStars = Math.floor(rating)
  const decimal = rating % 1

  for (let i = 0; i < 5; i++) {
    const isFilled = i < fullStars
    const isPartial = i === fullStars && decimal > 0

    stars.push(
      <div key={`star-${i}`} className="relative">
        <Star size={size} fill={isFilled ? color : "none"} stroke={color} strokeWidth={1.5} />
        {isPartial && (
          <div className="absolute inset-0 overflow-hidden" style={{ width: `${decimal * 100}%` }}>
            <Star size={size} fill={color} stroke={color} strokeWidth={1.5} />
          </div>
        )}
      </div>,
    )
  }

  return <div className="flex gap-1">{stars}</div>
}

const StatItem = ({ title, value }: { title: string; value: number }) => (
  <div className="shrink-0 flex items-center">
    <div className="w-20">{title}</div>
    <Progress style={{ flexShrink: 0, width: "100px" }} value={(value / 5) * 100} />
  </div>
)

export const ReviewStats = () => {
  const [stats, setStats] = useState<ReviewRatings>({
    total: 4.3,
    quantity: 4.5,
    taste: 4.2,
  })

  return (
    <div className="p-6 bg-white rounded-lg">
      <h2 className="pb-4 text-xl">전체 별점</h2>
      <div className="flex items-center gap-2">
        <div className="text-3xl font-bold">4.3</div>
        <StarRating rating={4.3} size={24} />
        <div className="text-base font-normal text-gray-700">{"(총 리뷰 1,111개)"}</div>
      </div>

      <div className="flex gap-8 flex-wrap">
        <StatItem title="양" value={stats.quantity} />
        <StatItem title="맛" value={stats.taste} />
        {/* <StatItem title="배달" value={stats.delivery} /> */}
      </div>
    </div>
  )
}
