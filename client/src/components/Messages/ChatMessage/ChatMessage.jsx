import './chat-message.scss'
import { apiBasePath } from '../../../data/config'
import Avatar from '../../UI/Avatar/Avatar'

export default function ChatMessage({ text, sender, user, message_type }) {
  return (
    <div className={`chat-message ${sender === user ? 'you' : 'other'}`}>
      {sender !== user && (
        <div className="chat-message-sender__image">
          {/* TODO: src should be dynamic */}
          <Avatar size={16} src={`${apiBasePath}/pfp/amogusz.jpg`} />
        </div>
      )}

      <div className="chat-message-container">
        {sender !== user && (
          <div className="chat-message-sender__name fs-300">
            <span>{sender} &#60;-- name of the sender</span>
          </div>
        )}

        <div
          className={`chat-message-message text-neutral-100 ${
            sender === user ? 'you' : 'other'
          }`}
        >
          {/* If type image */}
          {message_type === 'IMAGE' && (
            // TODO: create an image component
            <Avatar size={56} src={`${apiBasePath}/message/images/${text}`} />
          )}

          {/* If type other */}
          {message_type === 'OTHER' && (
            <a href={`${apiBasePath}/message/documents/${text}`} download>
              {text}
            </a>
          )}

          {/* If type text */}
          {message_type === 'TEXT' && (
            <span className="chat-message-message__text">{text}</span>
          )}
        </div>
      </div>
    </div>
  )
}
