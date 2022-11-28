import Avatar from '../UI/Avatar/Avatar'
import './user-card.scss'
import Button from '../UI/Button/Button'
import { useState } from 'react'

export default function UserCard({ profilePicUrl, username }) {
  const [userSettingsIsShowing, setUserSettingsIsShowing] = useState(true)

  const toggleUserSettings = () => {
    setUserSettingsIsShowing((prev) => !prev)
  }

  const handleLogout = () => {
    console.log('User logged out!')
  }

  return (
    <div className="user-card">
      <div className="user-card__user-info" onClick={toggleUserSettings}>
        <Avatar
          src={profilePicUrl}
          alt={`${username}'s profile pic`}
          size="48"
        />
        <span>{username}</span>
      </div>
      {userSettingsIsShowing && (
        <div className="user-card__user-settings">
          <Button onClick={handleLogout}>Log out</Button>
        </div>
      )}
    </div>
  )
}
