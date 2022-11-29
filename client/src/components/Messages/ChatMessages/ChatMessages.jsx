import { useParams } from 'react-router-dom'
import {
  useCurrentUserQuery,
  useUserChatsQuery,
} from '../../../graphql/hooks/graphql'
import ChatMessage from '../ChatMessage/ChatMessage'
import './chat-messages.scss'

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

  if (userLoading) return <h1>loading</h1>
  if (userError) return <h1>error</h1>
  if (chatsLoading) return <h1>loading</h1>
  if (chatsError) return <h1>error</h1>

  return (
    <div className="chat-messages">
      {chats.userChats.map((chatMessage) => (
        <ChatMessage
          user={user.currentUser.id}
          key={chatMessage.id}
          text={chatMessage.message}
          sender={chatMessage.user_id}
        />
      ))}
    </div>
  )
}
