import './rightbar.scss'
import Avatar from '../UI/Avatar/Avatar'
import MemberList from '../MemberList/MemberList'
// TODO: use the global chat data state here
import SettingsButtons from '../SettingsButtons/SettingsButtons'
import { useParams } from 'react-router-dom'
import { useGroupQuery } from '../../graphql/hooks/graphql'
import LoadingSpinner from '../Loading/LoadingSpinner/LoadingSpinner'
import ErrorText from '../Error/ErrorText'
import { apiBasePath } from '../../data/config'
import RoleMember from '../Role/RoleMembers/RoleMember'

export default function RightBar() {
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

  if (groupLoading) return <LoadingSpinner>Loading</LoadingSpinner>
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
          <MemberList />
        ) : (
          <span className="text-error-400">
            This should be the avatar of the other person
            {/* TODO: fetch the info of the other person in this chatId */}
            {/* <RoleMember id={} name={} pfp={} /> */}
          </span>
        )}
        <SettingsButtons />
      </div>
    </div>
  )
}
