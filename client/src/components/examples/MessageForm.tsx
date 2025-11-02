import MessageForm from '../MessageForm'

export default function MessageFormExample() {
  return (
    <div className="max-w-2xl">
      <MessageForm onSubmit={(msg) => console.log('Message submitted:', msg)} />
    </div>
  )
}
