import { ReviewFilters } from "./components/ReviewFilters"
import { ReviewList } from "./components/ReviewList"
import { ReviewStats } from "./components/ReviewStats"

export default function Page() {
  return (
    <div className="flex flex-col bg-zinc-100 w-full h-[calc(100dvh-80px)]">
      <div className="text-xl font-medium py-4 px-8 border-b border-b-slate-300 bg-white">
        리뷰관리
      </div>
      <div
        id="review-list-root"
        className="relative flex flex-col gap-4 overflow-y-auto light-scrollbar py-6 px-8"
      >
        <ReviewStats />
        <ReviewFilters />
        <ReviewList />
        <div id="review-list-spacer" style={{ height: 0, transition: "height 0.2s" }} />
      </div>
    </div>
  )
}
