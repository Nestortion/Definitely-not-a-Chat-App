import ChatMessage from '../ChatMessage/ChatMessage'
import './chat-messages.scss'

// TODO: fetch chat messages from api
// TODO: chat id should come from the global state
const dummyChatMessages = [
  {
    text: 'hello',
    sender: 'you',
  },
  {
    text: 'world',
    sender: 'other',
  },
  {
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi cupiditate aperiam amet quia nesciunt blanditiis inventore possimus officiis vitae eaque?',
    sender: 'you',
  },
  {
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi cupiditate aperiam amet quia nesciunt blanditiis inventore possimus officiis vitae eaque?',
    sender: 'other',
  },
]

export default function ChatMessages() {
  return (
    <div className="chat-messages">
      {dummyChatMessages.map((chatMessage) => (
        <ChatMessage text={chatMessage.text} sender={chatMessage.sender} />
      ))}
    </div>
  )
}
