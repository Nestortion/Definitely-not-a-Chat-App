import './rightbar.scss'
import Avatar from '../UI/Avatar/Avatar'
import { useContext } from 'react'
import ChatContext from '../../contexts/ChatContext'

export default function RightBar() {
  const { chat } = useContext(ChatContext)

  // * Loop through members property keys
  // * then loop through its elements
  const membersList = Object.keys(chat.members).map((key) => (
    <ul>
      <span>{key}</span>
      {chat.members[key].map((element) => (
        <li>{element}</li>
      ))}
    </ul>
  ))

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
      <div className="rightbar--main">{membersList}</div>
    </div>
  )
}
