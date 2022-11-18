import './chat-list-item.scss'
import Avatar from '../UI/Avatar/Avatar'

export default function ChatListItem({ chatId, title, profilePicUrl }) {
  return (
    <div className="chat-list-item">
      <div className="chat-list-item-left">
        <Avatar src={profilePicUrl} alt={`${title}'s photo`} size="56" />
      </div>
      <div className="chat-list-item-right">
        <span className="title">{title}</span>
      </div>
    </div>
  )
}
