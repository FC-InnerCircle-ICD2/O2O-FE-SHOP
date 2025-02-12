import { deleteReply, fetchReviews, updateReply } from "@/apis/review"
import { Button } from "@/components/Button"
import Icon from "@/components/Icon"
import { Textarea } from "@/components/shadcn/textarea"
import { DEFAULT_PAGINATION } from "@/constants"
import { useToast } from "@/hooks/useToast"
import { Review, Reply as TReply } from "@/types/models"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useQueryParams } from "../hooks/useQueryParams"

const RatingItem = ({ title, value }: { title: string; value: number }) => (
  <div className="flex items-center gap-1">
    <span className="text-sm text-gray-600">{title}</span>
    <Icon name="Star" fill="yellow" className="text-yellow-500 shrink-0" />
    <span className="text-sm text-yellow-500">{value}</span>
  </div>
)

const Reply = ({ reviewId, reply }: { reviewId: string; reply: TReply }) => {
  const { showNotification } = useToast()
  const [contents, setContents] = useState(reply.content)
  const [editing, setIsEditing] = useState(false)
  const handleClickDeleteButton = async () => {
    const { success, message } = await deleteReply(reviewId)
    if (success) {
      showNotification("success", "삭제되었습니다")
      setIsEditing(false)
    } else {
      showNotification("error", message || "")
    }
  }
  const handleClickEditButton = async () => {
    const { success, message } = await updateReply(reviewId, contents)
    if (success) {
      showNotification("success", "수정되었습니다")
      setIsEditing(false)
    } else {
      showNotification("error", message || "")
    }
  }
  if (editing) {
    return (
      <div className="w-full p-4 bg-gray-100 rounded-md text-sm flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="font-bold">사장님</div>
            <div className="text-gray-600">{reply.date}</div>
          </div>
          <div className="flex items-center">
            <Button
              variant={"text"}
              color={"default"}
              onClick={() => {
                setIsEditing(false)
                setContents(reply.content)
              }}
            >
              <Icon name="X" />
            </Button>
          </div>
        </div>
        <Textarea value={contents} onChange={(e) => setContents(e.target.value)} />
        <Button color={"primary"} size={"small"} onClick={handleClickEditButton}>
          수정하기
        </Button>
      </div>
    )
  }
  return (
    <div className="w-full p-4 bg-gray-200 rounded-md text-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="font-bold">사장님</div>
          <div className="text-gray-600">{reply.date}</div>
        </div>
        <div className="flex items-center">
          <Button
            variant={"text"}
            color={"primary"}
            size={"small"}
            onClick={() => setIsEditing(true)}
          >
            <Icon name="Pen" />
            수정
          </Button>
          <Button
            variant={"text"}
            color={"default"}
            size={"small"}
            onClick={handleClickDeleteButton}
          >
            <Icon name="Trash2" />
            삭제
          </Button>
        </div>
      </div>
      <div className="text-gray-600">{reply.content}</div>
    </div>
  )
}
const ReviewItem = ({ review }: { review: Review }) => (
  <div className="p-8 flex gap-8 border-b-2">
    <div className="shrink-0 flex flex-col gap-4 overflow-hidden">
      <div className="font-bold text-ellipsis">{review.nickname}</div>
      <div>
        <div className="flex items-center mb-2 gap-2">
          <div className="font-bold text-xl">5.0</div>
          <div className="text-yellow-500">별별별별별</div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <RatingItem title="양" value={review.ratings.quantity} />
          <RatingItem title="맛" value={review.ratings.quantity} />
        </div>
      </div>
      <div className="text-sm text-gray-600">{review.date}</div>
    </div>
    <div className="w-full flex flex-col gap-4">
      <div>{review.content}</div>
      <div className="flex items-center gap-2 overflow-hidden">
        {review.images.map((img, index) => (
          <img key={index} src={img} alt="리뷰이미지" width={150} className="rounded-sm" />
        ))}
      </div>
      {/* <div className="text-xs text-gray-600">{review.menu}</div> */}
      <div className="flex items-center gap-1">
        <Icon name="ThumbsUp" className="text-gray-600" />
        <div className="text-sm text-gray-600">{review.like}명에게 도움이 되었어요</div>
      </div>
      {review.reply ? (
        <Reply reviewId={review.id} reply={review.reply} />
      ) : (
        <Button color={"primary"}>댓글쓰기</Button>
      )}
    </div>
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
    <div>
      {reviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </div>
  )
}
