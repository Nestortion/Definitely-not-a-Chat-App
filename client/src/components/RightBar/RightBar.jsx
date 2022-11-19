import './rightbar.scss'
import Avatar from '../UI/Avatar/Avatar'
import { useContext } from 'react'
import ChatContext from '../../contexts/ChatContext'
import Button from '../UI/Button/Button'

export default function RightBar() {
  const { chat } = useContext(ChatContext)

  // TODO: Create a component maybe?
  // * Loop through members property keys
  // * then loop through its elements
  const membersList = (
    <div>
      {Object.entries(chat.members).map(([memberType, memberTypeMembers]) => (
        <ul>
          <span>{memberType}</span>
          {memberTypeMembers.map((member) => (
            <li>{member}</li>
          ))}
        </ul>
      ))}
    </div>
  )

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
        {membersList}
        <div>
          <Button>Add member</Button>
          <Button>Search in Group</Button>
          <Button>Report Chat</Button>
        </div>
      </div>
    </div>
  )
}
