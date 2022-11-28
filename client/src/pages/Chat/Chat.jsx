import './chat.scss'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import Avatar from '../../components/UI/Avatar/Avatar'
// ! FETCH HERE
// id is from the url parameter (e.g. /chat/:chatId)
// set global chat state here
import chat from '../../data/chat.json'
import ChatMessages from '../../components/Messages/ChatMessages/ChatMessages'
import { useMediaQuery } from 'react-responsive'

export default function Chat() {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 961px)' })

  return (
    <div className={`chat ${isTabletOrMobile && 'small-screen'}`}>
      <div className="header">
        <div className="chat-info">
          <Avatar
            src={chat.profilePicUrl}
            alt={`${chat.title}'s photo`}
            size="40"
          />
          <span>{chat.title}</span>
        </div>
        <Button>+</Button>
      </div>
      <div className="chat-messages-container">
        <ChatMessages />
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
