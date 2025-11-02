import MessageCard from '../MessageCard'

export default function MessageCardExample() {
  return (
    <div className="max-w-2xl">
      <MessageCard
        content="Love your work! The attention to detail in your projects is incredible. Keep creating amazing things!"
        timestamp={new Date(Date.now() - 1000 * 60 * 30)}
      />
    </div>
  )
}
