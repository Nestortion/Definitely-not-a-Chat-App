import './chat-list-item.scss'
import Avatar from '../UI/Avatar/Avatar'
import { useNavigate } from 'react-router-dom'
import { apiBasePath } from '../../data/config'

export default function ChatListItem({ chatId, title, profilePicUrl }) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/chat/${chatId}`)
  }

  return (
    <div className="chat-list-item" onClick={handleClick}>
      <div className="chat-list-item-left">
        <Avatar
          src={`${apiBasePath}/pfp/amogusz.jpg`}
          alt={`${title}'s photo`}
          size="56"
        />
      </div>
      <div className="chat-list-item-right">
        <span className="title">{title}</span>
      </div>
    </div>
  )
}
