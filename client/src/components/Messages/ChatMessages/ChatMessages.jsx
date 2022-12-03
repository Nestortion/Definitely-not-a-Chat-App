import { useParams } from 'react-router-dom'
import { useGroupQuery } from '../../../graphql/hooks/graphql'
import ChatMessage from '../ChatMessage/ChatMessage'
import './chat-messages.scss'
import LoadingSpinner from '../../Loading/LoadingSpinner/LoadingSpinner'
import ErrorText from '../../Error/ErrorText'

// ! FETCH HERE
// fetch messages from a chat/group chat
// chat id should come from the global state

export default function ChatMessages({ userChats, user }) {
  const { chatId } = useParams()

  const {
    data: groupData,
    loading: groupLoading,
    error: groupError,
  } = useGroupQuery({
    variables: { groupId: parseInt(chatId) },
  })

  if (groupLoading) return <LoadingSpinner>Loading</LoadingSpinner>
  if (groupError) return <ErrorText>Error</ErrorText>

  return (
    <div className="chat-messages">
      {userChats.data.userChats.map((chatMessage, index) => {
        if (chatMessage.receiver === parseInt(chatId)) {
          return (
            <ChatMessage
              user={user.currentUser.id}
              key={index}
              text={chatMessage.message}
              sender={chatMessage.user_id}
              message_type={chatMessage.message_type}
              is_group={groupData.group.is_group}
            />
          )
        }
      })}
    </div>
  )
}
