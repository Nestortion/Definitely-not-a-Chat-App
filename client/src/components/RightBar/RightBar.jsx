import './rightbar.scss'
import Avatar from '../UI/Avatar/Avatar'
import Button from '../UI/Button/Button'
import MemberList from '../MemberList/MemberList'
// ! TEMPORARY DATA ONLY
import chat from '../../data/chat.json'
import SettingsButtons from '../SettingsButtons/SettingsButtons'

export default function RightBar() {
  // TODO: Create a way to check if the chat is a group chat or a private chat
  // TODO: Use apollo client's useQuery here to fetch the current selected chat/group chat

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
        <SettingsButtons />
      </div>
    </div>
  )
}
