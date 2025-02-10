import { Button } from "@/components/Button"
import { ReviewFilters } from "./components/ReviewFilters"
import { ReviewList } from "./components/ReviewList"
import { ReviewStats } from "./components/ReviewStats"

export default function Page() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">리뷰 관리</h1>
      <ReviewStats />
      <ReviewFilters />
      <Button variant={"contained"} color={"primary"} className="mt-4">
        리뷰 조회
      </Button>
      <ReviewList />
    </div>
  )
}
