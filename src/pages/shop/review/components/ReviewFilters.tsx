export const ReviewFilters = () => (
  <div className="mb-4">
    <h2 className="text-xl font-bold mb-2">리뷰 조회 조건</h2>
    <div className="flex gap-4">
      <select className="border p-2">
        <option>최신순</option>
        <option>별점순</option>
      </select>
      <input type="date" className="border p-2" />
      <input type="date" className="border p-2" />
      <select className="border p-2">
        <option>전체</option>
        <option>답변</option>
        <option>미답변</option>
      </select>
    </div>
  </div>
)
