import MessageCard from '../MessageCard'

export default function MessageCardExample() {
  return (
    <div className="max-w-2xl bg-background p-6">
      <MessageCard
        content="love your work! the attention to detail in your projects is incredible."
        timestamp={new Date(Date.now() - 1000 * 60 * 30)}
      />
    </div>
  )
}
