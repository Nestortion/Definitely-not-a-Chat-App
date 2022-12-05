import { useUserRolesQuery } from '../../../graphql/hooks/graphql'
import ErrorText from '../../Error/ErrorText'
import LoadingSpinner from '../../Loading/LoadingSpinner/LoadingSpinner'
import RoleMember from '../RoleMembers/RoleMember'
import './role.scss'

export default function Role({ id, name, emoji }) {
  // fetch member here base on role
  const {
    data: members,
    loading,
    error,
  } = useUserRolesQuery({ variables: { groupRoleId: id } })

  if (loading) return <LoadingSpinner>Loading</LoadingSpinner>
  if (error) return <ErrorText>Error</ErrorText>

  return (
    <div className="role__container">
      <h1 className="fs-500">
        {name} {emoji}
      </h1>
      <div className="role__role-members">
        {members.userRoles.map((member) => (
          <RoleMember
            key={member.id}
            id={member.id}
            member={member.first_name}
            pfp={member.profile_img}
          />
        ))}
      </div>
    </div>
  )
}
