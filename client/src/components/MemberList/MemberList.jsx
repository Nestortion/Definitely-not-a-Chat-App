import { useParams } from 'react-router-dom'
import { useGroupRolesQuery } from '../../graphql/hooks/graphql'
import ErrorText from '../Error/ErrorText'
import LoadingText from '../Loading/LoadingText/LoadingText'
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

  if (loading) return <LoadingText>Loading</LoadingText>
  if (error) return <ErrorText>Error</ErrorText>

  return (
    <div className="member-list">
      {roles.groupRoles.map((role) => (
        <Role key={role.id} id={role.id} name={role.role_name} />
      ))}
    </div>
  )
}
