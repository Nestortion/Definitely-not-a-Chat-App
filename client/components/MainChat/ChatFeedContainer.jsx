import { ChatFeedContainerStyled } from '../styles/MainChatStyled'
import UserHeader from './UserHeader'
import MessageConstructor from './MessageConstructor'
import ChatFeed from './ChatFeed'
import AddFriendModal from './AddFriendModal/AddFriendModal'

export default function ChatFeedContainer() {
  return (
    <ChatFeedContainerStyled>
      <AddFriendModal />
      <UserHeader />
      <ChatFeed />
      <MessageConstructor />
    </ChatFeedContainerStyled>
  )
}
