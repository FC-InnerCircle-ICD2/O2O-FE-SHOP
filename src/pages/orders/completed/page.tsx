import { SearchFilter } from "./components/SearchFilter"
import { SearchResult } from "./components/SearchResult"

export default function Page() {
  return (
    <div className="bg-white w-full">
      <div className="text-3xl p-4 border-b border-b-slate-300">완료된 주문</div>
      <div className="p-4">
        <SearchFilter />
      </div>
      <div className="p-4">
        <SearchResult />
      </div>
    </div>
  )
}
