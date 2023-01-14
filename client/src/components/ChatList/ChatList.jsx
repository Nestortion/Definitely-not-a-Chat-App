import ChatListItem from '../ChatListItem/ChatListItem'
import './chat-list.scss'

export default function ChatList({ chats, showOnlyMiddle, latest }) {
  return (
    <div className="chat-list">
      {chats.map((chat) => (
        <ChatListItem
          key={chat.id}
          chatId={chat.id}
          latest={
            latest &&
            latest.filter(
              (latestChat) => latestChat && latestChat.receiver === chat.id
            )
          }
          isGroup={chat.is_group}
          profilePicUrl={chat.group_picture}
          title={chat.group_name}
          showOnlyMiddle={showOnlyMiddle}
        />
      ))}
    </div>
  )
}
