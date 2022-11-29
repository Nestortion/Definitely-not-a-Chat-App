import Avatar from '../UI/Avatar/Avatar'
import './user-card.scss'
import Button from '../UI/Button/Button'
import { useState } from 'react'

export default function UserCard({ profilePicUrl, first_name }) {
  const [userSettingsIsShowing, setUserSettingsIsShowing] = useState(false)

  const toggleUserSettings = () => {
    setUserSettingsIsShowing((prev) => !prev)
  }

  const handleLogout = () => {
    // ! MUTATION FOR LOGOUT
    console.log('User logged out!')
  }

  return (
    <div className="user-card">
      <div className="user-card__user-info" onClick={toggleUserSettings}>
        <Avatar
          src={
            // temporary placeholder
            `http://localhost:4000/pfp/amogusz.jpg`
          }
          alt={`${first_name}'s profile pic`}
          size="48"
        />
        <span>{first_name}</span>
      </div>
      {userSettingsIsShowing && (
        <div className="user-card__user-settings">
          <Button onClick={handleLogout}>Log out</Button>
        </div>
      )}
    </div>
  )
}
