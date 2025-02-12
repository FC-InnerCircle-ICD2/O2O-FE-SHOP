import { SearchFilter } from "./components/SearchFilter"
import { SearchResult } from "./components/SearchResult"

export default function Page() {
  return (
    <div className="flex flex-col bg-white w-full">
      <div className="text-xl font-medium py-4 px-8 border-b border-b-slate-300">주문 내역</div>

      <div className="pt-6 pb-2 px-8 bg-gray-50">
        <SearchFilter />
      </div>
      <div className="flex flex-1 py-4 px-8 bg-gray-50">
        <SearchResult />
      </div>
    </div>
  )
}
