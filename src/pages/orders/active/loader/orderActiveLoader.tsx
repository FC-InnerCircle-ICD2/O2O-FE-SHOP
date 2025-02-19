import { getActiveOrders } from "@/apis/useGetActiveOrders"
import { dehydrate, QueryClient } from "@tanstack/react-query"

const orderActiveLoader = async () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // hydration 중에 발생하는 일시적인 불일치를 방지하기 위한 설정
        retry: 1,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      },
    },
  })

  try {
    await queryClient.prefetchQuery({
      queryKey: ["orders", "new"],
      queryFn: getActiveOrders,
      staleTime: 5 * 60 * 1000, // 5분 동안 데이터를 fresh하게 유지
    })

    return {
      dehydratedState: dehydrate(queryClient),
      error: null,
    }
  } catch (error) {
    return {
      dehydratedState: dehydrate(queryClient),
      error: "데이터를 불러오는데 실패했습니다.",
    }
  } finally {
    queryClient.clear() // 메모리 누수 방지
  }
}

export default orderActiveLoader
