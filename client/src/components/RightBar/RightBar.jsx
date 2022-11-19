import './rightbar.scss'
import Avatar from '../UI/Avatar/Avatar'
import { useContext } from 'react'
import ChatContext from '../../contexts/ChatContext'
import Button from '../UI/Button/Button'
import MemberList from '../MemberList/MemberList'

export default function RightBar() {
  const { chat } = useContext(ChatContext)

  // TODO: Create a way to check if the chat is a group chat or a private chat

  return (
    <div className="rightbar">
      <div className="rightbar--header">
        <Avatar
          src={chat.profilePicUrl}
          alt={`${chat.title}'s photo`}
          size="80"
        />
        <span>{chat.title}</span>
      </div>
      <div className="rightbar--main">
        <MemberList chatMembers={chat.members} />
        <div>
          <Button>Add member</Button>
          <Button>Search in Group</Button>
          <Button>Report Chat</Button>
        </div>
      </div>
    </div>
  )
}
