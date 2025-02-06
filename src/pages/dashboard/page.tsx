import { useToast } from "@/hooks/useToast"

export default function Page() {
  const { showNotification } = useToast()

  const generateRandomId = () => {
    return crypto.randomUUID()
  }

  return (
    <div>
      {/* <button onClick={() => showNewOrderNotification(generateRandomId())}>toast</button> */}
      <button onClick={() => showNotification("error", "asdf")}>toast</button>
    </div>
  )
}
