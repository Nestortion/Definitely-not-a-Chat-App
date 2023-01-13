import { useParams } from 'react-router-dom'
import { useGroupQuery } from '../../../graphql/hooks/graphql'
import ChatMessage from '../ChatMessage/ChatMessage'
import './chat-messages.scss'
import LoadingSpinner from '../../Loading/LoadingSpinner/LoadingSpinner'
import ErrorText from '../../Error/ErrorText'
import { useEffect, useRef, useState } from 'react'

export default function ChatMessages({ userChats, user }) {
  const [isBottom, setIsBottom] = useState(true)
  const divRef = useRef()
  const divEndRef = useRef()
  const { chatId } = useParams()

  const {
    data: groupData,
    loading: groupLoading,
    error: groupError,
  } = useGroupQuery({
    variables: { groupId: parseInt(chatId) },
  })

  const isScrolledToBottom = () => {
    return (
      divRef.current.scrollHeight - divRef.current.clientHeight <=
      divRef.current.scrollTop + 1
    )
  }

  const handleScroll = () => {
    if (isScrolledToBottom()) {
      setIsBottom(true)
    } else {
      setIsBottom(false)
    }
  }

  useEffect(() => {
    divRef.current?.addEventListener('scroll', handleScroll)

    return () => {
      divRef.current?.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    if (isBottom) {
      divEndRef.current?.scrollIntoView()
    }
  }, [userChats])

  if (groupLoading) return <LoadingSpinner>Loading</LoadingSpinner>
  if (groupError) return <ErrorText>Error</ErrorText>

  return (
    <div className="chat-messages" ref={divRef}>
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
              messageDate={chatMessage.createdAt}
            />
          )
        }
      })}
      <div ref={divEndRef}></div>
    </div>
  )
}
