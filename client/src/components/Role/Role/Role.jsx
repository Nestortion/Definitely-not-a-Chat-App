import { useEffect } from 'react'
import {
  MemberAddedDocument,
  useUserRolesQuery,
} from '../../../graphql/hooks/graphql'
import ErrorText from '../../Error/ErrorText'
import LoadingSpinner from '../../Loading/LoadingSpinner/LoadingSpinner'
import RoleMember from '../RoleMembers/RoleMember'
import './role.scss'

export default function Role({
  id,
  name,
  emoji,
  showOnlyMiddle,
  rolesRefetch,
  user,
}) {
  // fetch member here base on role
  const {
    data: members,
    loading,
    error,
    subscribeToMore,
  } = useUserRolesQuery({ variables: { groupRoleId: id } })

  useEffect(() => {
    subscribeToMore({
      document: MemberAddedDocument,
      variables: { user: user.id },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        rolesRefetch()
      },
    })
  }, [])

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorText>Error</ErrorText>

  return (
    <div className="role__container">
      <h1 className="fs-500">
        {name} {emoji ? emoji : ''}
      </h1>
      <div className="role__role-members">
        {members.userRoles.map((member) => (
          <RoleMember
            key={member.id}
            id={member.id}
            name={member.first_name}
            pfp={member.profile_img}
            showOnlyMiddle={showOnlyMiddle}
          />
        ))}
      </div>
    </div>
  )
}
