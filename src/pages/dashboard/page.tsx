import { useToast } from "@/hooks/useToast"

export default function Page() {
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
