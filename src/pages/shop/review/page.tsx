import { Button } from "@/components/Button"
import { ReviewFilters } from "./components/ReviewFilters"
import { ReviewList } from "./components/ReviewList"
import { ReviewStats } from "./components/ReviewStats"

export default function Page() {
  return (
    <div className="flex flex-col bg-gray-50 w-full">
      <div className="text-xl font-medium py-4 px-8 border-b border-b-slate-300 bg-white">
        리뷰관리
      </div>
      <div className="pt-6 pb-2 px-8">
        <ReviewStats />
      </div>
      <div className="pt-2 pb-2 px-8">
        <ReviewFilters />
      </div>
      <div className="flex-1 pt-2 pb-10 px-8">
        <ReviewList />
      </div>
    </div>
  )
}
