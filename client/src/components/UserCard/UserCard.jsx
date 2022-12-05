import Avatar from '../UI/Avatar/Avatar'
import './user-card.scss'
import Button from '../UI/Button/Button'
import { useState } from 'react'
import { apiBasePath } from '../../data/config'
import { useLogoutMutation } from '../../graphql/hooks/graphql'
import { setAccessToken } from '../../graphql/authStore'
import { useNavigate } from 'react-router-dom'

export default function UserCard({ profile_img, first_name }) {
  const [userSettingsIsShowing, setUserSettingsIsShowing] = useState(false)
  const [logout] = useLogoutMutation()
  const navigate = useNavigate()

  const toggleUserSettings = () => {
    setUserSettingsIsShowing((prev) => !prev)
  }

  const handleSettings = async () => {
    navigate('/profile-settings')
  }

  const handleLogout = async () => {
    await logout()
    setAccessToken('')
    navigate(0)
    console.log('User logged out!')
  }

  return (
    <div className={`user-card ${userSettingsIsShowing && 'clicked'}`}>
      <div className="user-card__user-info" onClick={toggleUserSettings}>
        <Avatar
          src={`${apiBasePath}/pfp/${profile_img}`}
          alt={`${first_name}'s profile pic`}
          size="48"
        />
        <span className="fw-bold fs-400">{first_name}</span>
      </div>
      {userSettingsIsShowing && (
        <div className="user-card__user-settings bg-neutral-100">
          <Button onClick={handleSettings}>Settings</Button>
          <Button onClick={handleLogout}>Log out</Button>
        </div>
      )}
    </div>
  )
}
