import Avatar from '../UI/Avatar/Avatar'
import './user-card.scss'

export default function UserCard({ profilePicUrl, username }) {
  return (
    <div className="user-card">
      <Avatar src={profilePicUrl} alt={`${username}'s profile pic`} size="48" />
      <span>{username}</span>
    </div>
  )
}
