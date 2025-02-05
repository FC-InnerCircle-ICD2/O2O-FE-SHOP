import { useToast } from "@/hooks/useToast"

export default function Page() {
  const { showNewOrderNotification, showErrorNotification } = useToast()

  const generateRandomId = () => {
    return crypto.randomUUID()
  }

  return (
    <div>
      {/* <button onClick={() => showNewOrderNotification(generateRandomId())}>toast</button> */}
      <button onClick={() => showErrorNotification("asdf")}>toast</button>
    </div>
  )
}
