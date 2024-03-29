import './rightbar.scss'
import Avatar from '../UI/Avatar/Avatar'
import MemberList from '../MemberList/MemberList'
// TODO: use the global chat data state here
import SettingsButtons from '../SettingsButtons/SettingsButtons'
import { Link, useParams } from 'react-router-dom'
import {
  GroupRolesUpdatedDocument,
  useCurrentUserGroupRolesQuery,
  useCurrentUserQuery,
  useGroupQuery,
  useGroupRolesListQuery,
  useOtherUserQuery,
} from '../../graphql/hooks/graphql'
import LoadingSpinner from '../Loading/LoadingSpinner/LoadingSpinner'
import ErrorText from '../Error/ErrorText'
import { apiBasePath } from '../../data/config'
import { useEffect } from 'react'

export default function RightBar({ showOnlyMiddle }) {
  // Check if global chat state is existing
  // Hide Rightbar if we not on Chat page
  const { chatId } = useParams()
  const {
    data: rolesList,
    loading: rolesListLoading,
    error: rolesListError,
    refetch: rolesListRefetch,
    subscribeToMore: rolesSubscribeToMore,
  } = useGroupRolesListQuery({
    variables: { groupId: parseInt(chatId) },
  })
  const {
    data: groupData,
    loading: groupLoading,
    error: groupError,
  } = useGroupQuery({
    variables: { groupId: parseInt(chatId) },
  })

  const {
    data: otherUser,
    loading: otherUserLoading,
    error: otherUserError,
  } = useOtherUserQuery({ variables: { groupId: parseInt(chatId) } })

  const {
    data: roles,
    loading: rolesLoading,
    error: rolesError,
  } = useCurrentUserGroupRolesQuery({
    variables: { groupId: parseInt(chatId) },
  })

  const {
    data: user,
    loading: userLoading,
    error: userError,
  } = useCurrentUserQuery()

  useEffect(() => {
    rolesSubscribeToMore({
      document: GroupRolesUpdatedDocument,
      variables: { user: user.currentUser.id },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return prev

        return {
          groupRolesList: subscriptionData.data.groupRolesUpdated.newRoles,
        }
      },
    })
  }, [])

  if (userLoading) return <LoadingSpinner />
  if (userError) return <ErrorText>Error</ErrorText>
  if (rolesLoading) return <LoadingSpinner />
  if (rolesError) return <ErrorText>Error</ErrorText>
  if (rolesListLoading) return <LoadingSpinner />
  if (rolesListError) return <ErrorText>Error</ErrorText>
  if (otherUserLoading) return <LoadingSpinner />
  if (otherUserError) return <ErrorText>Error</ErrorText>
  if (groupLoading) return <LoadingSpinner />
  if (groupError) return <ErrorText>Error</ErrorText>

  return (
    <div className="rightbar">
      <div className="rightbar--header">
        {groupData.group.is_group === 'true' ? (
          <>
            <Avatar
              src={`${apiBasePath}/grouppfp/${groupData.group.group_picture}`}
              alt={`${groupData.group.group_name}'s photo`}
              size="80"
            />
            <span>{groupData.group.group_name}</span>
          </>
        ) : (
          <Link
            to={`/profile/${otherUser.otherUser.id}`}
            style={{
              textDecoration: 'none',
              color: 'var(--clr-neutral-900)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <Avatar
              src={`${apiBasePath}/pfp/${otherUser.otherUser.profile_img}`}
              alt={`${groupData.group.group_name}'s photo`}
              size="80"
            />
            <span>{`${otherUser.otherUser.first_name} ${otherUser.otherUser.last_name}`}</span>
          </Link>
        )}
      </div>
      <div className="rightbar--main">
        {groupData.group.is_group === 'true' && (
          <MemberList
            rolesListRefetch={rolesListRefetch}
            userRoles={roles.currentUserGroupRoles.roles}
            rolesList={rolesList.groupRolesList}
            user={user.currentUser}
            showOnlyMiddle={showOnlyMiddle}
          />
        )}
        <SettingsButtons
          rolesList={rolesList.groupRolesList}
          isGroup={groupData.group.is_group}
          userRoles={roles.currentUserGroupRoles.roles}
        />
      </div>
    </div>
  )
}
