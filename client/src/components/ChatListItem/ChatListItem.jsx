import './chat-list-item.scss'
import Avatar from '../UI/Avatar/Avatar'

export default function ChatListItem({ chatId, title, profilePicUrl }) {
  return (
    <div className="chat-list-item">
      <div className="left">
        <Avatar src={profilePicUrl} alt={`${title}'s photo`} size="56" />
      </div>
      <div className="right">
        <span className="title">{title}</span>
      </div>
    </div>
  )
}
