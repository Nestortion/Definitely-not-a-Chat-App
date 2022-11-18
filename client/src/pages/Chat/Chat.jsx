import './chat.scss'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'

export default function Chat() {
  return (
    <div className="chat">
      <div className="header">
        <div className="chat-info">
          <div>
            <span>Chat image</span>
            <span>Chat title</span>
          </div>
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
