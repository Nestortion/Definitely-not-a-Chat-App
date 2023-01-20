import { useState } from 'react'
import { MdSettings } from 'react-icons/md'
import { apiBasePath } from '../../data/config'
import { useGroupMembersQuery } from '../../graphql/hooks/graphql'
import ErrorText from '../Error/ErrorText'
import LoadingSpinner from '../Loading/LoadingSpinner/LoadingSpinner'
import Avatar from '../UI/Avatar/Avatar'
import './group-list.scss'

export default function GroupList({ id, groupName, profilePicUrl, isGroup }) {
  const {
    data: groupMembers,
    loading: groupMembersLoading,
    error: groupMembersError,
  } = useGroupMembersQuery({ variables: { groupId: id } })

  const [shouldShowMembers, setShouldShowMembers] = useState(false)

  if (groupMembersLoading) return <LoadingSpinner />
  if (groupMembersError) return <ErrorText>Something Went Wrong</ErrorText>

  const toggleShowMembers = () => {
    setShouldShowMembers((prev) => !prev)
  }

  return (
    <>
      <div
        className="group-list control-panel__card"
        onClick={toggleShowMembers}
      >
        <Avatar size={36} src={`${apiBasePath}/grouppfp/${profilePicUrl}`} />
        <span>{id}</span>
        <span>{groupName}</span>
        {isGroup === 'true' ? (
          <span>Group Chat</span>
        ) : (
          <span>Private Chat</span>
        )}

        <span>
          <MdSettings />
        </span>
      </div>
      {shouldShowMembers && (
        <div className="group-list__member-list control-panel__card">
          {groupMembers.groupMembers.map((member) => (
            <div
              key={member.id}
              className="group-list__member control-panel__card"
            >
              <Avatar
                size={24}
                src={`${apiBasePath}/pfp/${member.profile_img}`}
              />
              <span>{`${member.first_name} ${member.last_name}`}</span>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
