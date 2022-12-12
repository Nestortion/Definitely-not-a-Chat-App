import { useMediaQuery } from 'react-responsive'
import { useNavigate } from 'react-router-dom'
import { apiBasePath } from '../../../data/config'
import Avatar from '../../UI/Avatar/Avatar'
import './role-member.scss'

export default function RoleMember({ id, name, pfp, showOnlyMiddle }) {
  const navigate = useNavigate()
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 961px)' })

  const navigateToProfile = () => {
    if (isTabletOrMobile) {
      showOnlyMiddle()
    }
    navigate(`/profile/${id}`)
  }

  const handleEditRole = () => {
    console.log(id)
  }
  const handleRemoveMember = () => {
    console.log(id)
  }

  return (
    <div className="role-member">
      <div className="role-member__info">
        <Avatar
          size={20}
          src={`${apiBasePath}/pfp/${pfp}`}
          onClick={navigateToProfile}
        />
        <span className="fs-400">{name}</span>
      </div>
      <span onClick={handleEditRole}>Edit Role</span>
      <span onClick={handleRemoveMember}>X</span>
    </div>
  )
}
