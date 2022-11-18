import './chat.scss'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import { useContext } from 'react'
import ChatContext from '../../contexts/ChatContext'
import Avatar from '../../components/UI/Avatar/Avatar'

export default function Chat() {
  const { chat, setChat } = useContext(ChatContext)

  return (
    <div className="chat">
      <div className="header">
        <div className="chat-info">
          <Avatar
            src={chat.profilePicUrl}
            alt={`${chat.title}'s photo`}
            size="40"
          />
          <span>Chat title</span>
        </div>
        <Button>+</Button>
      </div>
      <div className="chat-messages-container">
        <div>Chat 1</div>
        <div>Chat 2</div>
      </div>
      <div className="chat-input-container">
        <form>
          {/* TODO: Create FileInput component */}
          <button>+</button>
          <Input type="text" />
          <Button>Send</Button>
        </form>
      </div>
    </div>
  )
}
