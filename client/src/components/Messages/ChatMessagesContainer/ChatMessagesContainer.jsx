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
import { useParams } from 'react-router-dom'
import { useState } from 'react'

export default function ChatMessagesContainer() {
  const { chatId } = useParams()
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
        if (subscriptionData.data.chatAdded.receiver !== parseInt(chatId))
          return prev
        console.log('sent')
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
