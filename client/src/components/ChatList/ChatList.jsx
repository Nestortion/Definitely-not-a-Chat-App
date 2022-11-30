import ChatListItem from '../ChatListItem/ChatListItem'
import './chat-list.scss'

export default function ChatList({ chats, showOnlyMiddle }) {
  return (
    <div className="chat-list">
      {chats.map((chat) => (
        <ChatListItem
          key={chat.id}
          chatId={chat.id}
          profilePicUrl={chat.profilePicUrl}
          title={chat.group_name}
          showOnlyMiddle={showOnlyMiddle}
        />
      ))}
    </div>
  )
}
