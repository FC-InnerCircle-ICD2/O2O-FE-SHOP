import { deleteReply, fetchReviews, updateReply } from "@/apis/review"
import { Button } from "@/components/Button"
import Icon from "@/components/Icon"
import { Textarea } from "@/components/shadcn/textarea"
import { DEFAULT_PAGINATION } from "@/constants"
import { useToast } from "@/hooks/useToast"
import { Review, Reply as TReply } from "@/types/models"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { QueryParams, useQueryParams } from "../hooks/useQueryParams"
import { useGetReviews } from "@/apis/useGetReviews"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll"
import { ApiResponse } from "@/types/api"
import { StarRating } from "./ReviewStats"
import { format } from "date-fns"
import { maskNickname } from "@/utils/format"
import { Star } from "lucide-react"
import { Separator } from "@/components/shadcn/separator"

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
    <div className="bg-gray-100 rounded-md">
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
          <Textarea className="bg-white resize-none" />
          <div className="flex justify-end">
            <Button color={"primary"} size={"small"}>
              등록
            </Button>
          </div>
        </div>
      )}
    </div>
  )
  // if (editing) {
  //   return (
  //     <div className="w-full p-4 bg-gray-50 rounded-md text-sm flex flex-col gap-4">
  //       <div className="flex items-center justify-between">
  //         <div className="flex items-center gap-4">
  //           <div className="font-bold">사장님</div>
  //           <div className="text-gray-600">{reply.date}</div>
  //         </div>
  //         <div className="flex items-center">
  //           <Button
  //             variant={"text"}
  //             color={"default"}
  //             onClick={() => {
  //               setIsEditing(false)
  //               setContents(reply.content)
  //             }}
  //           >
  //             <Icon name="X" />
  //           </Button>
  //         </div>
  //       </div>
  //       <Textarea value={contents} onChange={(e) => setContents(e.target.value)} />
  //       <Button color={"primary"} size={"small"} onClick={handleClickEditButton}>
  //         수정하기
  //       </Button>
  //     </div>
  //   )
  // }
  // return (
  //   <div className="w-full p-4 bg-gray-100 rounded-md text-sm">
  //     <div className="flex items-center justify-between">
  //       <div className="flex items-center gap-4">
  //         <div className="font-bold">사장님</div>
  //         <div className="text-gray-600">{reply.date}</div>
  //       </div>
  //       <div className="flex items-center">
  //         <Button
  //           variant={"text"}
  //           color={"primary"}
  //           size={"small"}
  //           onClick={() => setIsEditing(true)}
  //         >
  //           <Icon name="Pen" />
  //           수정
  //         </Button>
  //         <Button
  //           variant={"text"}
  //           color={"default"}
  //           size={"small"}
  //           onClick={handleClickDeleteButton}
  //         >
  //           <Icon name="Trash2" />
  //           삭제
  //         </Button>
  //       </div>
  //     </div>
  //     <div className="text-gray-600">{reply.content}</div>
  //   </div>
  // )
}
const ReviewItem = ({ review }: { review: Review }) => (
  <div className="p-8 flex gap-14 border-b-2">
    <div className="min-w-[146px] shrink-0 flex flex-col gap-4 overflow-hidden">
      <div className="font-semibold text-ellipsis">{maskNickname(review.nickname)}</div>
      <div>
        <div className="flex items-center mb-2 gap-2">
          <div className="font-bold text-xl">{review.ratings.total}</div>
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
    <div className="bg-white rounded-lg">
      {data?.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
      <div ref={targetRef} />
    </div>
  )
}
