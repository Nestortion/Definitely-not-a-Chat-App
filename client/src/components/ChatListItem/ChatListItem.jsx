import './chat-list-item.scss'
import Avatar from '../UI/Avatar/Avatar'
import { NavLink } from 'react-router-dom'
import { apiBasePath } from '../../data/config'
import { useMediaQuery } from 'react-responsive'
import { useOtherUserQuery } from '../../graphql/hooks/graphql'
import LoadingSpinner from '../Loading/LoadingSpinner/LoadingSpinner'
import ErrorText from '../Error/ErrorText'

export default function ChatListItem({
  chatId,
  title,
  profilePicUrl,
  showOnlyMiddle,
  isGroup,
  latest,
}) {
  const {
    data: otherUser,
    loading: otherUserLoading,
    error: otherUserError,
  } = useOtherUserQuery({ variables: { groupId: parseInt(chatId) } })

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

  const displayMessageAge = (message) => {
    const messageDate = new Date(message.createdAt)

    const timeDiff = Math.abs(Date.now() - messageDate)

    let newTime = timeDiff / (1000 * 24 * 60 * 60)

    if (newTime < 1) {
      newTime = Math.abs((newTime *= 24))
      if (newTime < 1) {
        newTime = Math.ceil((newTime *= 60))
        return `${newTime}m`
      }

      return `${Math.floor(newTime)}h`
    } else if (newTime >= 1 && newTime < 7) {
      return `${Math.ceil(newTime)}d`
    } else if (newTime >= 7 && newTime <= 28) {
      newTime = Math.abs((newTime /= 7))

      return `${Math.floor(newTime)}w`
    }
  }

  if (otherUserLoading) return <LoadingSpinner />
  if (otherUserError)
    return (
      <div className="chat-list-item chat-list-item__error">
        <div className="chat-list-item-left">
          <Avatar src={`${apiBasePath}/grouppfp/default-icon.png`} size="40" />
        </div>
        <div className="chat-list-item-right">
          <span>You are removed from this group</span>
        </div>
      </div>
    )

  return (
    <NavLink
      to={`/chat/${chatId}`}
      className={({ isActive }) =>
        isActive ? 'chat-list-item active' : 'chat-list-item'
      }
      onClick={handleClick}
    >
      <div className="chat-list-item-left">
        {isGroup === 'true' ? (
          <>
            <Avatar
              src={`${apiBasePath}/grouppfp/${profilePicUrl}`}
              alt={`${title.group_name}'s photo`}
              size="40"
            />
          </>
        ) : (
          <>
            <Avatar
              src={`${apiBasePath}/pfp/${otherUser.otherUser.profile_img}`}
              alt={`${title.group_name}'s photo`}
              size="40"
            />
          </>
        )}
      </div>
      <div className="chat-list-item-right">
        <span className="title">{title}</span>
        <span className="latest-message fs-400">
          <span>{latest[0] ? displayLatest(latest[0]) : null}</span>
          {latest[0] && ` ● `}
          <span>{latest[0] && displayMessageAge(latest[0])}</span>
        </span>
      </div>
    </NavLink>
  )
}
