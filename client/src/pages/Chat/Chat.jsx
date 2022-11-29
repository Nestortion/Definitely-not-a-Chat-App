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
import { useGroupQuery } from '../../graphql/hooks/graphql'
import { useParams } from 'react-router-dom'
import { apiBasePath } from '../../data/config'

export default function Chat() {
  const { chatId } = useParams()
  const { data, loading, error } = useGroupQuery({
    variables: { groupId: parseInt(chatId) },
  })
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 961px)' })

  if (loading) return <h1>loading</h1>
  if (error) return <h1>error</h1>

  return (
    <div className={`chat ${isTabletOrMobile && 'small-screen'}`}>
      <div className="header">
        <div className="chat-info">
          <Avatar
            src={`${apiBasePath}/pfp/amogusz.jpg`}
            alt={`${data.group.group_name}'s photo`}
            size="40"
          />
          <span>{data.group.group_name}</span>
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
