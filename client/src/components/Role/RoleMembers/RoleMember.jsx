import { useNavigate } from 'react-router-dom'
import { apiBasePath } from '../../../data/config'
import Avatar from '../../UI/Avatar/Avatar'
import './role-member.scss'

export default function RoleMember({ id, name, pfp }) {
  const navigate = useNavigate()

  const navigateToProfile = () => {
    navigate(`/profile/${id}`)
  }

  return (
    <div className="role-member">
      <Avatar
        size={20}
        src={`${apiBasePath}/pfp/${pfp}`}
        onClick={navigateToProfile}
      />
      <span className="fs-400">{name}</span>
    </div>
  )
}
