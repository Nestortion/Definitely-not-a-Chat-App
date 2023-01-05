import { useEffect } from 'react'
import {
  MemberAddedDocument,
  MemberRemovedDocument,
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
        const members = subscriptionData.data.memberAdded.users.filter(
          (user) => user.role.id === id
        )

        const newMembers = members.map((user) => {
          return {
            first_name: user.user.first_name,
            last_name: user.user.last_name,
            id: user.user.id,
            profile_img: user.user.profile_img,
            __typename: user.user.__typename,
          }
        })
        rolesRefetch()
        return {
          userRoles: prev.userRoles.concat(newMembers),
        }
      },
    })
    subscribeToMore({
      document: MemberRemovedDocument,
      variables: { user: user.id },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev

        const removed = prev.userRoles.filter(
          (user) => user.id !== subscriptionData.data.memberRemoved.user.id
        )

        return {
          userRoles: [...removed],
        }
      },
    })
  }, [])

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorText>Error</ErrorText>

  return (
    <>
      {members.userRoles.length > 0 && (
        <div className="role__container">
          <h1 className="fs-500">
            {name} {emoji ? emoji : ''}
          </h1>
          <div className="role__role-members">
            {members.userRoles.map((member, index) => (
              <RoleMember
                key={index}
                isGroup="true"
                id={member.id}
                name={member.first_name}
                pfp={member.profile_img}
                showOnlyMiddle={showOnlyMiddle}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}
