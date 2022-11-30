import './chat-message.scss'
import { apiBasePath } from '../../../data/config'
import Avatar from '../../UI/Avatar/Avatar'
import LoadingText from '../../Loading/LoadingText'
import ErrorText from '../../Error/ErrorText'
import { useUserQuery } from '../../../graphql/hooks/graphql'

export default function ChatMessage({
  text,
  sender,
  user,
  message_type,
  is_group,
}) {
  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useUserQuery({ variables: { userId: sender } })

  if (userLoading) return <LoadingText>Loading</LoadingText>
  if (userError) return <ErrorText>Error</ErrorText>

  const senderShouldShow = is_group === 'true' && sender !== user

  let newText = text

  if (message_type === 'OTHER') {
    let unique = text.split(' ')[0]
    newText = text.split(`${unique} `)[1]
  }

  return (
    <div className={`chat-message ${sender === user ? 'you' : 'other'}`}>
      {senderShouldShow && (
        <div className="chat-message-sender__image">
          {/* TODO: src should be dynamic */}
          <Avatar size={16} src={`${apiBasePath}/pfp/amogusz.jpg`} />
        </div>
      )}

      <div className="chat-message-container">
        {senderShouldShow && (
          <div className="chat-message-sender__name fs-300">
            <span>{userData.user.first_name}</span>
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
              {newText}
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
