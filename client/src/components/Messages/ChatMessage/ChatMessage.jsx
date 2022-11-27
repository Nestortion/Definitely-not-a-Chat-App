import './chat-message.scss'

export default function ChatMessage({ text, sender }) {
  return (
    <div className={`chat-message ${sender}`}>
      <span>{text}</span>
    </div>
  )
}
