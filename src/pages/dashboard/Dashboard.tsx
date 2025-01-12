import useModal from "@/hooks/useModal"

const DashboardPage = () => {
  const { Modal } = useModal()

  return (
    <div>
      <button onClick={() => Modal({ content: <div>modal</div> })}>modal</button>
    </div>
  )
}

export default DashboardPage
