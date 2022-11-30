import { useUserRolesQuery } from '../../../graphql/hooks/graphql'
import ErrorText from '../../Error/ErrorText'
import LoadingText from '../../Loading/LoadingText'
import RoleMember from '../RoleMembers/RoleMember'

export default function Role({ id, name }) {
  // fetch member here base on role
  const {
    data: members,
    loading,
    error,
  } = useUserRolesQuery({ variables: { groupRoleId: id } })

  if (loading) return <LoadingText>Loading</LoadingText>
  if (error) return <ErrorText>Error</ErrorText>

  return (
    <div>
      <h1>{name}</h1>
      {members.userRoles.map((member) => (
        <RoleMember
          key={member.id}
          member={member.first_name}
          pfp={member.profile_img}
        />
      ))}
    </div>
  )
}
