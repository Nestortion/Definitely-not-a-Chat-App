import {
  ChatAddedDocument,
  useCurrentUserQuery,
  useUserChatsQuery,
} from '../../../graphql/hooks/graphql'
import ErrorText from '../../Error/ErrorText'
import LoadingSpinner from '../../Loading/LoadingSpinner/LoadingSpinner'
import ChatMessages from '../ChatMessages/ChatMessages'
import './chat-messages-container.scss'
import { useEffect } from 'react'

export default function ChatMessagesContainer() {
  const chatsQuery = useUserChatsQuery()

  const {
    data: user,
    loading: userLoading,
    error: userError,
  } = useCurrentUserQuery()

  useEffect(() => {
    chatsQuery.subscribeToMore({
      document: ChatAddedDocument,
      variables: { user: user.currentUser.id },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        let previousChats = prev.userChats
        return {
          userChats: [...previousChats, subscriptionData.data.chatAdded],
        }
      },
    })
  }, [])

  if (userLoading) return <LoadingSpinner />
  if (userError) return <ErrorText>Error</ErrorText>
  if (chatsQuery.loading) return <LoadingSpinner />
  if (chatsQuery.error) return <ErrorText>Error</ErrorText>

  return (
    <div className="chat-messages-container">
      <ChatMessages user={user} userChats={chatsQuery} />
    </div>
  )
}
