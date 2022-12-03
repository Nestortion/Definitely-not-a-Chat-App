import { useParams } from 'react-router-dom'
import { useGroupRolesQuery } from '../../graphql/hooks/graphql'
import ErrorText from '../Error/ErrorText'
import LoadingSpinner from '../Loading/LoadingSpinner/LoadingSpinner'
import Role from '../Role/Role/Role'
import './memberlist.scss'

export default function MemberList() {
  // fetch roles here
  const { chatId } = useParams()
  const {
    data: roles,
    loading,
    error,
  } = useGroupRolesQuery({ variables: { groupId: parseInt(chatId) } })

  if (loading) return <LoadingSpinner>Loading</LoadingSpinner>
  if (error) return <ErrorText>Error</ErrorText>

  return (
    <div className="member-list">
      {roles.groupRoles.map((role) => (
        <Role
          key={role.id}
          id={role.id}
          name={role.role_name}
          emoji={role.emoji}
        />
      ))}
    </div>
  )
}
