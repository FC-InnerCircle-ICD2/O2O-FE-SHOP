import { useToast } from "@/hooks/useToast"

export default function Page() {
  const { showNewOrderNotification } = useToast()

  const generateRandomId = () => {
    return crypto.randomUUID()
  }

  return (
    <div>
      <button onClick={() => showNewOrderNotification(generateRandomId())}>{import.meta.env.VITE_PUBLIC_API_URL}</button>
    </div>
  )
}
