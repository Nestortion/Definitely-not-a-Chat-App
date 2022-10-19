import { ChatListContainerStyled } from '../styles/MainChatStyled'
import Search from './Search'
import ChatList from './ChatList'

export default function ChatListContainer() {
  return (
    <ChatListContainerStyled>
      <Search />
      <ChatList />
    </ChatListContainerStyled>
  )
}
