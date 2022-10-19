import AddFriendModal from '../components/MainChat/AddFriendModal/AddFriendModal'
import ChatFeed from '../components/MainChat/ChatFeed'
import ChatList from '../components/MainChat/ChatList'
import MessageConstructor from '../components/MainChat/MessageConstructor'
import RoleList from '../components/MainChat/RoleList'
import Search from '../components/MainChat/Search'
import Settings from '../components/MainChat/Settings'
import UserHeader from '../components/MainChat/UserHeader'
import { MainChatStyled } from '../components/styles/MainChatStyled'

export default function Home() {
  return (
    <MainChatStyled>
      <div className="friendList">
        <Search />
        <ChatList />
      </div>
      <div className="chatWindow">
        <AddFriendModal />
        <UserHeader />
        <ChatFeed />
        <MessageConstructor />
      </div>
      <div className="chatSettings">
        <RoleList />
        <Settings />
      </div>
    </MainChatStyled>
  )
}
