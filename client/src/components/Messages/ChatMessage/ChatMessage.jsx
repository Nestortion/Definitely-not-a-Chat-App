import './chat-message.scss'

export default function ChatMessage({
  text,
  sender,
  isImage,
  isFile,
  url,
  fileName,
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
    <div className={`chat-message ${sender}`}>
      <span>{text}</span>
    </div>
  )
}
