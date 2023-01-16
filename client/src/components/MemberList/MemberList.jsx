import { useParams } from 'react-router-dom'
import Role from '../Role/Role/Role'
import './memberlist.scss'

export default function MemberList({
  showOnlyMiddle,
  user,
  userRoles,
  rolesList,
  rolesListRefetch,
}) {
  // fetch rolesList here
  const { chatId } = useParams()

  return (
    <div className="member-list">
      {rolesList.map((role) => (
        <Role
          userRoles={userRoles}
          key={role.id}
          id={role.id}
          name={role.role_name}
          emoji={role.emoji}
          showOnlyMiddle={showOnlyMiddle}
          rolesRefetch={rolesListRefetch}
          user={user}
        />
      ))}
    </div>
  )
}
