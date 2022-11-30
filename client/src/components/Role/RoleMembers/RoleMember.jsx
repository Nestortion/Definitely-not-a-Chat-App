import { apiBasePath } from '../../../data/config'
import Avatar from '../../UI/Avatar/Avatar'

export default function RoleMember({ member }) {
  return (
    <div>
      <Avatar size={20} src={`${apiBasePath}/pfp/amogusz.jpg`} />
    </div>
  )
}
