import { useToast } from "@/hooks/useToast"

const DashboardPage = () => {
  const { showNewOrderNotification } = useToast()

  const generateRandomId = () => {
    return crypto.randomUUID()
  }

  return (
    <div>
      <button onClick={() => showNewOrderNotification(generateRandomId())}>toast</button>
    </div>
  )
}

export default DashboardPage
