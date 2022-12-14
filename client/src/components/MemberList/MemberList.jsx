import { useParams } from 'react-router-dom'
import {
  useCurrentUserQuery,
  useGroupRolesQuery,
} from '../../graphql/hooks/graphql'
import ErrorText from '../Error/ErrorText'
import LoadingSpinner from '../Loading/LoadingSpinner/LoadingSpinner'
import Role from '../Role/Role/Role'
import './memberlist.scss'

export default function MemberList({ showOnlyMiddle }) {
  // fetch roles here
  const { chatId } = useParams()
  const {
    data: roles,
    loading,
    error,
    refetch,
  } = useGroupRolesQuery({ variables: { groupId: parseInt(chatId) } })

  const {
    data: user,
    loading: userLoading,
    error: userError,
  } = useCurrentUserQuery()

  if (userLoading) return <LoadingSpinner />
  if (userError) return <ErrorText>Error</ErrorText>
  if (loading) return <LoadingSpinner />
  if (error) return <ErrorText>Error</ErrorText>

  return (
    <div className="member-list">
      {roles.groupRoles.map((role) => (
        <Role
          key={role.id}
          id={role.id}
          name={role.role_name}
          emoji={role.emoji}
          showOnlyMiddle={showOnlyMiddle}
          rolesRefetch={refetch}
          user={user.currentUser}
        />
      ))}
    </div>
  )
}
