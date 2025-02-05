import { SearchFilter } from "./components/SearchFilter"
import { SearchResult } from "./components/SearchResult"

export default function Page() {
  return (
    <div className="bg-white w-full">
      <div className="text-xl font-medium py-4 px-8 border-b border-b-slate-300">주문 내역</div>
      <div className="p-8">
        <SearchFilter />
      </div>
      <div className="p-8">
        <SearchResult />
      </div>
    </div>
  )
}
