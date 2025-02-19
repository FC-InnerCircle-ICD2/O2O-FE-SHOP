import { ReviewFilters } from "./components/ReviewFilters"
import { ReviewList } from "./components/ReviewList"
import { ReviewStats } from "./components/ReviewStats"

export default function Page() {
  return (
    <div className="relative w-[calc(100dvw-16rem)] h-[calc(100dvh-80px)] overflow-auto light-scrollbar bg-zinc-100">
      <div className="flex flex-col items-center w-full">
        <div className="w-full text-xl font-medium py-4 px-8 border-b border-b-slate-300 bg-white">
          리뷰 관리
        </div>
        <div id="review-list-root" className="flex flex-col gap-4 w-[900px] py-6 px-8 m-auto">
          <ReviewStats />
          <ReviewFilters />
          <ReviewList />
          <div id="review-list-spacer" style={{ height: 0, transition: "height 0.2s" }} />
        </div>
      </div>
    </div>
  )
}
