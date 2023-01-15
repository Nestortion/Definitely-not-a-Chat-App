import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  GroupRolesUpdatedDocument,
  useGroupRolesQuery,
} from '../../graphql/hooks/graphql'
import ErrorText from '../Error/ErrorText'
import LoadingSpinner from '../Loading/LoadingSpinner/LoadingSpinner'
import Role from '../Role/Role/Role'
import './memberlist.scss'

export default function MemberList({ showOnlyMiddle, user }) {
  // fetch roles here
  const { chatId } = useParams()
  const {
    data: roles,
    loading,
    error,
    refetch,
    subscribeToMore,
  } = useGroupRolesQuery({ variables: { groupId: parseInt(chatId) } })

  useEffect(() => {
    subscribeToMore({
      document: GroupRolesUpdatedDocument,
      variables: { user: user.id },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return prev

        return { groupRoles: subscriptionData.data.groupRolesUpdated.newRoles }
      },
    })
  }, [])

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
          user={user}
        />
      ))}
    </div>
  )
}
