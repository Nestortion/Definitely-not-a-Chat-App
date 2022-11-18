import ChatListItem from '../ChatListItem/ChatListItem'
import './chat-list.scss'

export default function ChatList({ chats }) {
  return (
    <div className="chat-list">
      {chats.map((chat) => (
        <ChatListItem
          key={chat.chatId}
          chatId={chat.chatId}
          profilePicUrl={chat.profilePicUrl}
          title={chat.title}
        />
      ))}
    </div>
  )
}
