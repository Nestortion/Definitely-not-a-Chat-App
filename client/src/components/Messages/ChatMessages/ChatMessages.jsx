import { useParams } from 'react-router-dom'
import {
  ChatAddedDocument,
  useCurrentUserQuery,
  useGroupQuery,
  useUserChatsQuery,
} from '../../../graphql/hooks/graphql'
import ChatMessage from '../ChatMessage/ChatMessage'
import './chat-messages.scss'
import LoadingSpinner from '../../Loading/LoadingSpinner/LoadingSpinner'
import ErrorText from '../../Error/ErrorText'
import { useEffect } from 'react'

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
  const chatsQuery = useUserChatsQuery({
    variables: { receiver: parseInt(chatId) },
  })

  const {
    data: groupData,
    loading: groupLoading,
    error: groupError,
  } = useGroupQuery({
    variables: { groupId: parseInt(chatId) },
  })

  useEffect(() => {
    chatsQuery.subscribeToMore({
      document: ChatAddedDocument,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        let previousChats = prev.userChats
        return {
          userChats: [...previousChats, subscriptionData.data.chatAdded],
        }
      },
    })
    return () => chatsQuery
  }, [user])

  if (groupLoading) return <LoadingSpinner>Loading</LoadingSpinner>
  if (groupError) return <ErrorText>Error</ErrorText>
  if (userLoading) return <LoadingSpinner>Loading</LoadingSpinner>
  if (userError) return <ErrorText>Error</ErrorText>
  if (chatsQuery.loading) return <LoadingSpinner>Loading</LoadingSpinner>
  if (chatsQuery.error) return <ErrorText>Error</ErrorText>

  return (
    <div className="chat-messages">
      {chatsQuery.data.userChats.map((chatMessage, index) => (
        <ChatMessage
          user={user.currentUser.id}
          key={index}
          text={chatMessage.message}
          sender={chatMessage.user_id}
          message_type={chatMessage.message_type}
          is_group={groupData.group.is_group}
        />
      ))}
    </div>
  )
}
