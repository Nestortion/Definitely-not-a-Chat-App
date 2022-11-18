import './user-card.scss'

export default function UserCard({ profilePicUrl, username }) {
  return (
    <div className="user-card">
      <img src={profilePicUrl} alt="Profile" />
      <span>{username}</span>
    </div>
  )
}
