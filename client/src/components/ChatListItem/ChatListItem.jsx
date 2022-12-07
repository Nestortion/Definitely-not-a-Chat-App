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
  latest,
}) {
  // ! FETCH HERE
  // fetch the latest conversation for each group chat where the current user is a member

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 961px)' })

  const handleClick = () => {
    if (isTabletOrMobile) {
      showOnlyMiddle()
    }
  }

  const displayLatest = (message) => {
    if (message.message_type === 'IMAGE') {
      return 'Sent an image'
    } else if (message.message_type === 'OTHER') {
      return 'Sent a file'
    } else {
      return `${message.message}`
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
        <span className="latest-message fs-400">
          {latest[0] ? displayLatest(latest[0]) : null}
        </span>
      </div>
    </NavLink>
  )
}
