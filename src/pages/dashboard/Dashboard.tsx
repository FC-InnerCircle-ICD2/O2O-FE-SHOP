import { useToast } from "@/hooks/useToast"

const DashboardPage = () => {
  const { showNewOrderNotification } = useToast()

  return (
    <div>
      <button onClick={showNewOrderNotification}>toast</button>
    </div>
  )
}

export default DashboardPage
