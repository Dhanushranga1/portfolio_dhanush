import MessageForm from '../MessageForm'

export default function MessageFormExample() {
  return (
    <div className="max-w-2xl bg-background p-6">
      <MessageForm onSubmit={(msg) => console.log('Message submitted:', msg)} />
    </div>
  )
}
