import './chat-message.scss'
import { apiBasePath } from '../../../data/config'
import Avatar from '../../UI/Avatar/Avatar'

export default function ChatMessage({ text, sender, user, message_type }) {
  return (
    <div className="chat-message text-neutral-100">
      <div className="chat-message-sender">
        {sender !== user && <Avatar size={30} src={``} />}
      </div>
      <div
        className={`chat-message-message ${sender === user ? 'you' : 'other'}`}
      >
        {message_type === 'IMAGE' && (
          <Avatar size={56} src={`${apiBasePath}/message/images/${text}`} />
        )}
        {message_type === 'OTHER' && (
          <a href={`${apiBasePath}/message/documents/${text}`} download>
            {text}
          </a>
        )}
        {message_type === 'TEXT' && <span>{text}</span>}
      </div>
    </div>
  )
}
