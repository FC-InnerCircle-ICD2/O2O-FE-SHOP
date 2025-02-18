import { deleteReply, registerReply } from "@/apis/review"
import { Button } from "@/components/Button"
import Confirm from "@/components/Confirm"
import Icon from "@/components/Icon"
import ImageModal from "@/components/ImageModal"
import { Card } from "@/components/shadcn/card"
import { Textarea } from "@/components/shadcn/textarea"
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll"
import useModal from "@/hooks/useModal"
import { useToast } from "@/hooks/useToast"
import { Review, Reply as TReply } from "@/types/models"
import { maskNickname } from "@/utils/format"
import { useQueryClient } from "@tanstack/react-query"
import { Star } from "lucide-react"
import { useState } from "react"
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
  const [contents, setContents] = useState("")
  const { showNotification } = useToast()
  const { show } = useModal()

  const qc = useQueryClient()

  const handleClickDeleteButton = async () => {
    show({
      content: (
        <Confirm
          title="리뷰 삭제"
          message="리뷰를 삭제할까요?"
          onConfirmClick={async () => {
            const { success, message } = await deleteReply(reviewId)

            if (success) {
              qc.invalidateQueries({ queryKey: ["reviews"] })
              showNotification("success", "삭제되었습니다")
            } else {
              showNotification("error", message || "")
            }
          }}
        />
      ),
    })
  }

  const handleClickRegisterButton = async () => {
    if (!contents) {
      showNotification("error", "내용을 입력해주세요")
      return
    }

    const { success, message } = await registerReply(reviewId, contents)

    if (success) {
      qc.invalidateQueries({ queryKey: ["reviews"] })
      showNotification("success", "등록되었습니다")
      setContents("")
    } else {
      showNotification("error", message || "")
    }
  }

  return (
    <Card className="bg-zinc-100 border-none rounded-md">
      {reply ? (
        <div className="flex flex-col gap-2 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">사장님</span>
              <span className="text-sm text-gray-500">{reply.date}</span>
            </div>
            <div className="flex items-center gap-2">
              {/* <button className="flex items-center gap-1 text-sm hover:text-blue-400">
                <Icon name="Pencil" size="12px" />
                수정
              </button>
              <Separator className="h-[12px]" orientation="vertical" /> */}
              <button
                className="flex items-center gap-1 text-sm hover:text-blue-400"
                onClick={handleClickDeleteButton}
              >
                <Icon name="Trash2" size="12px" />
                삭제
              </button>
            </div>
          </div>
          <p className="text-base">{reply.content}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2 pt-4 px-4 pb-2">
          <Textarea
            className="bg-white resize-none shadow-none"
            value={contents}
            onChange={(e) => setContents(e.target.value)}
          />
          <div className="flex justify-end">
            <Button color={"primary"} size={"small"} onClick={handleClickRegisterButton}>
              등록
            </Button>
          </div>
        </div>
      )}
    </Card>
  )
}
const ReviewItem = ({ review }: { review: Review }) => {
  const { show, hide } = useModal()

  const handleClickImage = (url: string) => {
    show({
      content: <ImageModal images={url} onClose={hide} />,
    })
  }

  return (
    <div className="p-8 flex gap-14">
      <div className="min-w-[146px] shrink-0 flex flex-col gap-4 overflow-hidden">
        <div className="font-semibold text-ellipsis">{maskNickname(review.nickname)}</div>
        <div>
          <div className="flex items-center mb-2 gap-2">
            <div className="font-bold text-xl">{review.rating.total.toFixed(1)}</div>
            <StarRating rating={review.rating.total} size={18} />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <RatingItem title="양" value={review.rating.quantity} />
            <RatingItem title="맛" value={review.rating.taste} />
          </div>
        </div>
        <div className="text-sm text-gray-600">{review.date}</div>
      </div>
      <div className="w-full flex flex-col gap-4">
        <div className="whitespace-pre-line">{review.content}</div>
        {review.images.length > 0 && (
          <div className="flex items-center gap-2">
            {review.images.map((img, index) => {
              if (!img) {
                return null
              }
              return (
                <div
                  key={index}
                  className="size-[100px] rounded-md cursor-pointer"
                  style={{
                    backgroundImage: `url(${img})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  onClick={() => handleClickImage(img)}
                />
              )
            })}
          </div>
        )}
        <Reply reviewId={review.id} reply={review.reply} />
      </div>
    </div>
  )
}

export const ReviewList = () => {
  const { startDate, endDate, sort, answerType } = useQueryParams()

  const { data, targetRef } = useInfiniteScroll<Review, QueryParams>({
    queryKey: "reviews",
    endpoint: "reviews",
    filter: { startDate, endDate, sort, answerType },
    size: 5,
  })

  return (
    <Card className="bg-white rounded-lg">
      <div className="divide-y-2 divide-zinc-200">
        {data && data.length > 0 ? (
          data?.map((review) => <ReviewItem key={review.id} review={review} />)
        ) : (
          <div className="flex items-center justify-center h-[200px]">
            <div className="text-base text-gray-500">등록된 리뷰가 없습니다.</div>
          </div>
        )}
      </div>
      <div ref={targetRef} />
    </Card>
  )
}
