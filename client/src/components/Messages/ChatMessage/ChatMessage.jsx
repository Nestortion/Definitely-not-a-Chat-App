import './chat-message.scss'
import { apiBasePath } from '../../../data/config'
import Avatar from '../../UI/Avatar/Avatar'

export default function ChatMessage({ text, sender, user, message_type }) {
  if (message_type === 'IMAGE') {
    return (
      <div className={`chat-message ${sender === user ? 'you' : 'other'}`}>
        <Avatar size={56} src={`${apiBasePath}/message/images/${text}`} />
      </div>
    )
  }

  if (message_type === 'OTHER') {
    return (
      <div className={`chat-message ${sender === user ? 'you' : 'other'}`}>
        <a href={`${apiBasePath}/message/documents/${text}`} download>
          {text}
        </a>
      </div>
    )
  }

  return (
    <div className={`chat-message ${sender === user ? 'you' : 'other'}`}>
      <span>{text}</span>
    </div>
  )
}
