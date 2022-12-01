import { useParams } from 'react-router-dom'
import {
  useCurrentUserQuery,
  useGroupQuery,
  useUserChatsQuery,
} from '../../../graphql/hooks/graphql'
import ChatMessage from '../ChatMessage/ChatMessage'
import './chat-messages.scss'
import LoadingSpinner from '../../Loading/LoadingSpinner/LoadingSpinner'
import ErrorText from '../../Error/ErrorText'

// ! FETCH HERE
// fetch messages from a chat/group chat
// chat id should come from the global state

export default function ChatMessages() {
  const {
    data: user,
    loading: userLoading,
    error: userError,
  } = useCurrentUserQuery()

  const { chatId } = useParams()
  const {
    data: chats,
    loading: chatsLoading,
    error: chatsError,
  } = useUserChatsQuery({ variables: { receiver: parseInt(chatId) } })

  const {
    data: groupData,
    loading: groupLoading,
    error: groupError,
  } = useGroupQuery({
    variables: { groupId: parseInt(chatId) },
  })

  if (groupLoading) return <LoadingSpinner>Loading</LoadingSpinner>
  if (groupError) return <ErrorText>Error</ErrorText>
  if (userLoading) return <LoadingSpinner>Loading</LoadingSpinner>
  if (userError) return <ErrorText>Error</ErrorText>
  if (chatsLoading) return <LoadingSpinner>Loading</LoadingSpinner>
  if (chatsError) return <ErrorText>Error</ErrorText>

  return (
    <div className="chat-messages">
      {chats.userChats.map((chatMessage) => (
        <ChatMessage
          user={user.currentUser.id}
          key={chatMessage.id}
          text={chatMessage.message}
          sender={chatMessage.user_id}
          message_type={chatMessage.message_type}
          is_group={groupData.group.is_group}
        />
      ))}
    </div>
  )
}
