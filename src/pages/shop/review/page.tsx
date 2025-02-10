import { Button } from "@/components/Button"
import { ReviewFilters } from "./components/ReviewFilters"
import { ReviewList } from "./components/ReviewList"
import { ReviewStats } from "./components/ReviewStats"

export default function Page() {
  return (
    <div className="bg-white w-full">
      <div className="text-xl font-medium py-4 px-8 border-b border-b-slate-300">주문 내역</div>
      <div className="p-8">
        <ReviewStats />
      </div>
      <div className="p-8">
        <ReviewFilters />
      </div>
      <div className="p-8">
        <ReviewList />
      </div>
    </div>
  )
}
