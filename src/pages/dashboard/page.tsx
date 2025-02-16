import Dashboard from "./_components/Dashboard"

export default function Page() {
  return (
    <div className="grid grid-rows-[auto_1fr] w-full bg-red-500 h-[calc(100dvh-80px)] overflow-y-auto">
      <div className="text-xl font-medium py-4 px-8 border-b border-b-slate-300 bg-white">
        대시보드
      </div>
      <Dashboard />
    </div>
  )
}
