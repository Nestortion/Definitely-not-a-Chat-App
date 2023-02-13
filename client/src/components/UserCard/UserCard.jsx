import Avatar from '../UI/Avatar/Avatar'
import './user-card.scss'
import Button from '../UI/Button/Button'
import { useState } from 'react'
import { apiBasePath } from '../../data/config'
import { useLogoutMutation } from '../../graphql/hooks/graphql'
import { setAccessToken } from '../../graphql/authStore'
import { useNavigate } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import { MdWarning } from 'react-icons/md'
import { useAtom } from 'jotai'
import { hasNotifStore } from '../../store/notificationStore'

export default function UserCard({
  profile_img,
  first_name,
  showOnlyMiddle,
  user,
}) {
  const [userSettingsIsShowing, setUserSettingsIsShowing] = useState(false)
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 961px)' })
  const [logout] = useLogoutMutation()
  const navigate = useNavigate()
  const [hasNotif, setHasNotif] = useAtom(hasNotifStore)

  const toggleUserSettings = () => {
    setUserSettingsIsShowing((prev) => !prev)
  }

  const handleSettings = async () => {
    if (isTabletOrMobile) {
      showOnlyMiddle()
    }
    navigate('/profile-settings')
  }

  const handleLogout = async () => {
    await logout()
    setAccessToken('')
    navigate(0)
  }

  const handleAdminPage = async () => {
    navigate('/admin')
  }

  return (
    <div className={`user-card ${userSettingsIsShowing && 'clicked'}`}>
      <div className="user-card__user-info" onClick={toggleUserSettings}>
        <div className="user-card__image-container">
          <Avatar
            src={`${apiBasePath}/pfp/${profile_img}`}
            alt={`${first_name}'s profile pic`}
            size="48"
          />
          {hasNotif && (
            <div className="user-card__has-notif">
              <MdWarning size={20} />
            </div>
          )}
        </div>
        <span className="fw-bold fs-400">{first_name}</span>
      </div>
      {userSettingsIsShowing && (
        <div className="user-card__user-settings bg-neutral-100">
          <Button onClick={handleSettings}>Settings</Button>
          <Button onClick={handleLogout}>Log out</Button>
          {user.currentUser.access_level === 'ADMIN' && (
            <Button onClick={handleAdminPage}>Admin Panel</Button>
          )}
        </div>
      )}
    </div>
  )
}
