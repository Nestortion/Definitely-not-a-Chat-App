import './chat-message.scss'

export default function ChatMessage({
  text,
  sender,
  isImage,
  isFile,
  url,
  fileName,
  user,
}) {
  if (isImage) {
    return <img src={url} />
  }

  if (isFile) {
    return (
      <a href={url} download>
        {fileName}
      </a>
    )
  }

  return (
    <div className={`chat-message ${sender === user ? 'you' : 'other'}`}>
      <span>{text}</span>
    </div>
  )
}
