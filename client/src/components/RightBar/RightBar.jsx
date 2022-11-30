import './rightbar.scss'
import Avatar from '../UI/Avatar/Avatar'
import MemberList from '../MemberList/MemberList'
// TODO: use the global chat data state here
import chat from '../../data/chat.json'
import SettingsButtons from '../SettingsButtons/SettingsButtons'
import { useParams } from 'react-router-dom'
import { useGroupQuery } from '../../graphql/hooks/graphql'
import LoadingText from '../Loading/LoadingText'
import ErrorText from '../Error/ErrorText'
import { apiBasePath } from '../../data/config'

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

  if (groupLoading) return <LoadingText>Loading</LoadingText>
  if (groupError) return <ErrorText>Error</ErrorText>

  return (
    <div className="rightbar">
      <div className="rightbar--header">
        <Avatar
          src={`${apiBasePath}/pfp/amogusz.jpg`}
          alt={`${groupData.group.group_name}'s photo`}
          size="80"
        />
        <span>{groupData.group.group_name}</span>
      </div>
      <div className="rightbar--main">
        <MemberList chatMembers={chat.members} />
        <SettingsButtons />
      </div>
    </div>
  )
}
