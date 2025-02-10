import { fetchReviews } from "@/apis/review"
import { Review } from "@/types/models"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useQueryParams } from "../hooks/useQueryParams"
import { DEFAULT_PAGINATION } from "@/constants"
import { p } from "msw/lib/core/GraphQLHandler-C5CUIS_N"

const RatingItem = ({ title, value }: { title: string; value: number }) => (
  <div className="flex flex-col items-center">
    <span className="font-bold">{title}</span>
    <span>{value}</span>
  </div>
)

const ReviewItem = ({ review }: { review: Review }) => (
  <div className="border p-4 mb-4">
    <div className="flex justify-between">
      <span className="font-bold">{review.nickname}</span>
      <span>{review.date}</span>
    </div>
    <div className="flex gap-4">
      <RatingItem title="양" value={review.ratings.quantity} />
      <RatingItem title="맛" value={review.ratings.taste} />
      <RatingItem title="배달" value={review.ratings.delivery} />
    </div>
    <div className="mt-2">
      <span className="font-bold">메뉴: </span>
      {review.menu.join(", ")}
    </div>
    <div className="mt-2">{review.content}</div>
    {review.images.length > 0 && (
      <div className="mt-2">
        {review.images.map((image, index) => (
          <img key={index} src={image} alt={`Review ${index}`} className="w-16 h-16" />
        ))}
      </div>
    )}
    {review.reply && (
      <div className="mt-4 border-t pt-2">
        <div className="flex justify-between">
          <span className="font-bold">점주의 답변</span>
          <span>{review.reply.date}</span>
        </div>
        <div>{review.reply.content}</div>
      </div>
    )}
  </div>
)

export const ReviewList = () => {
  const [searchParams] = useSearchParams()

  const [reviews, setReviews] = useState<Review[]>([])
  const [pagination, setPagination] = useState(DEFAULT_PAGINATION)
  const { startDate, endDate, order } = useQueryParams()

  useEffect(() => {
    if (searchParams.size <= 0) return
    const fetch = async () => {
      const { data } = await fetchReviews({
        page: 0,
        size: 10,
        startDate,
        endDate,
        order,
      })
      setReviews(data)
    }
    fetch()
  }, [searchParams])
  return (
    <div className="mt-4">
      {reviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </div>
  )
}
