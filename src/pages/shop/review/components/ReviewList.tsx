import { Button } from "@/components/Button"
import Icon from "@/components/Icon"
import { Separator } from "@/components/shadcn/separator"
import { Textarea } from "@/components/shadcn/textarea"
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll"
import { Review, Reply as TReply } from "@/types/models"
import { maskNickname } from "@/utils/format"
import { format } from "date-fns"
import { Star } from "lucide-react"
import { QueryParams, useQueryParams } from "../hooks/useQueryParams"
import { StarRating } from "./ReviewStats"

const RatingItem = ({ title, value }: { title: string; value: number }) => (
  <div className="flex items-center gap-1">
    <span className="text-sm text-gray-600">{title}</span>
    <Star size={16} fill="#FFD700" stroke={"#FFD700"} strokeWidth={1.5} />
    <span className="text-sm text-yellow-500">{value}</span>
  </div>
)

const Reply = ({ reviewId, reply }: { reviewId: string; reply?: TReply }) => {
  // const { showNotification } = useToast()

  // const handleClickDeleteButton = async () => {
  //   const { success, message } = await deleteReply(reviewId)
  //   if (success) {
  //     showNotification("success", "삭제되었습니다")
  //     setIsEditing(false)
  //   } else {
  //     showNotification("error", message || "")
  //   }
  // }

  // const handleClickEditButton = async () => {
  //   const { success, message } = await updateReply(reviewId, contents)
  //   if (success) {
  //     showNotification("success", "수정되었습니다")
  //     setIsEditing(false)
  //   } else {
  //     showNotification("error", message || "")
  //   }
  // }

  return (
    <div className="bg-gray-100 rounded-md shadow-md">
      {reply ? (
        <div className="flex flex-col gap-2 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">사장님</span>
              <span className="text-sm text-gray-500">2023.06.01</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1 text-sm hover:text-blue-400">
                <Icon name="Pencil" size="12px" />
                수정
              </button>
              <Separator className="h-[12px]" orientation="vertical" />
              <button className="flex items-center gap-1 text-sm hover:text-blue-400">
                <Icon name="Trash2" size="12px" />
                삭제
              </button>
            </div>
          </div>
          <p className="text-base">{reply.content}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2 pt-4 px-4 pb-2">
          <Textarea className="bg-white resize-none shadow-none" />
          <div className="flex justify-end">
            <Button color={"primary"} size={"small"}>
              등록
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
const ReviewItem = ({ review }: { review: Review }) => (
  <div className="p-8 flex gap-14">
    <div className="min-w-[146px] shrink-0 flex flex-col gap-4 overflow-hidden">
      <div className="font-semibold text-ellipsis">{maskNickname(review.nickname)}</div>
      <div>
        <div className="flex items-center mb-2 gap-2">
          <div className="font-bold text-xl">{review.ratings.total.toFixed(1)}</div>
          <StarRating rating={review.ratings.total} size={18} />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <RatingItem title="양" value={review.ratings.quantity} />
          <RatingItem title="맛" value={review.ratings.quantity} />
        </div>
      </div>
      <div className="text-sm text-gray-600">{format(new Date(review.date), "yyyy.MM.dd")}</div>
    </div>
    <div className="w-full flex flex-col gap-4">
      <div>{review.content}</div>
      {review.images.length > 0 && (
        <div className="flex items-center gap-2">
          {review.images.map((img, index) => (
            <div
              key={index}
              className="size-[100px] rounded-md"
              style={{
                backgroundImage: `url(${img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          ))}
        </div>
      )}
      {/* <div className="text-xs text-gray-600">{review.menu}</div> */}
      {/* <div className="flex items-center gap-1">
        <Icon name="ThumbsUp" className="text-gray-600" />
        <div className="text-sm text-gray-600">{review.like}명에게 도움이 되었어요</div>
      </div> */}
      <Reply reviewId={review.id} reply={review.reply} />
    </div>
  </div>
)

export const ReviewList = () => {
  const { startDate, endDate, order, answerType } = useQueryParams()

  const { data, targetRef } = useInfiniteScroll<Review, QueryParams>({
    queryKey: "reviews",
    endpoint: "reviews",
    filter: { startDate, endDate, order, answerType },
    size: 1,
  })

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="divide-y-2 divide-zinc-200">
        {data?.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </div>
      <div ref={targetRef} />
    </div>
  )
}
