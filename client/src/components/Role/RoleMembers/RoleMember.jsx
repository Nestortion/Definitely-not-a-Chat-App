import { apiBasePath } from '../../../data/config'
import Avatar from '../../UI/Avatar/Avatar'
import './role-member.scss'

export default function RoleMember({ member, pfp }) {
  return (
    <div className="role-member">
      <Avatar size={20} src={`${apiBasePath}/pfp/${pfp}`} />
      <span className="fs-400">{member}</span>
    </div>
  )
}
