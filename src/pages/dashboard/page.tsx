import { HydrationBoundary } from "@tanstack/react-query"
import { useLoaderData } from "react-router-dom"
import Dashboard from "./_components/Dashboard"
import dashboardLoader from "./loader/dashboardLoader"

export default function Page() {
  const { dehydratedState, error } = useLoaderData<typeof dashboardLoader>()

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div className="grid grid-rows-[auto_1fr] w-full h-[calc(100dvh-80px)] overflow-y-auto">
      <div className="overflow-auto bg-gray-50 light-scrollbar ">
        <div className="text-xl font-medium py-4 px-8 border-b border-b-slate-300 bg-white">
          대시보드
        </div>
        <HydrationBoundary state={dehydratedState}>
          <Dashboard />
        </HydrationBoundary>
      </div>
    </div>
  )
}
