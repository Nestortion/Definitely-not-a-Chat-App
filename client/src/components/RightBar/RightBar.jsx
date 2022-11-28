import './rightbar.scss'
import Avatar from '../UI/Avatar/Avatar'
import MemberList from '../MemberList/MemberList'
// TODO: use the global chat data state here
import chat from '../../data/chat.json'
import SettingsButtons from '../SettingsButtons/SettingsButtons'

export default function RightBar() {
  // Check if global chat state is existing
  // Hide Rightbar if we not on Chat page
  if (!chat) {
    return
  }

  // Render chat state if it exists
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
