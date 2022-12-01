import './chat-list-item.scss'
import Avatar from '../UI/Avatar/Avatar'
import { NavLink } from 'react-router-dom'
import { apiBasePath } from '../../data/config'
import { useMediaQuery } from 'react-responsive'

export default function ChatListItem({
  chatId,
  title,
  profilePicUrl,
  showOnlyMiddle,
}) {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 961px)' })

  const handleClick = () => {
    if (isTabletOrMobile) {
      showOnlyMiddle()
    }
  }

  return (
    <NavLink
      to={`/chat/${chatId}`}
      className={({ isActive }) =>
        isActive ? 'chat-list-item active' : 'chat-list-item'
      }
      onClick={handleClick}
    >
      <div className="chat-list-item-left">
        <Avatar
          // TODO: add default
          src={`${apiBasePath}/pfp/${profilePicUrl}`}
          alt={`${title}'s photo`}
          size="56"
        />
      </div>
      <div className="chat-list-item-right">
        <span className="title">{title}</span>
      </div>
    </NavLink>
  )
}
