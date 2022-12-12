import './rightbar.scss'
import Avatar from '../UI/Avatar/Avatar'
import MemberList from '../MemberList/MemberList'
// TODO: use the global chat data state here
import SettingsButtons from '../SettingsButtons/SettingsButtons'
import { useParams } from 'react-router-dom'
import {
  useGroupQuery,
  useUserGroupRolesQuery,
} from '../../graphql/hooks/graphql'
import LoadingSpinner from '../Loading/LoadingSpinner/LoadingSpinner'
import ErrorText from '../Error/ErrorText'
import { apiBasePath } from '../../data/config'
import RoleMember from '../Role/RoleMembers/RoleMember'

export default function RightBar({ showOnlyMiddle }) {
  // Check if global chat state is existing
  // Hide Rightbar if we not on Chat page
  const { chatId } = useParams()
  const {
    data: groupData,
    loading: groupLoading,
    error: groupError,
  } = useGroupQuery({
    variables: { groupId: parseInt(chatId) },
  })

  const {
    data: roles,
    loading: rolesLoading,
    error: rolesError,
  } = useUserGroupRolesQuery({ variables: { groupId: parseInt(chatId) } })

  if (rolesLoading) return <LoadingSpinner />
  if (rolesError) return <ErrorText>Error</ErrorText>
  if (groupLoading) return <LoadingSpinner />
  if (groupError) return <ErrorText>Error</ErrorText>

  return (
    <div className="rightbar">
      <div className="rightbar--header">
        <Avatar
          src={`${apiBasePath}/pfp/${groupData.group.group_picture}`}
          alt={`${groupData.group.group_name}'s photo`}
          size="80"
        />
        <span>{groupData.group.group_name}</span>
      </div>
      <div className="rightbar--main">
        {groupData.group.is_group === 'true' ? (
          <MemberList showOnlyMiddle={showOnlyMiddle} />
        ) : (
          <RoleMember id={1} name={'The other person'} pfp={'/images/pfp'} />
        )}
        <SettingsButtons isGroup={groupData.group.is_group} roles={roles} />
      </div>
    </div>
  )
}
