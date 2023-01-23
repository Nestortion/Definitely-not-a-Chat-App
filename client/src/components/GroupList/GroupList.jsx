import { useState } from 'react'
import { MdArrowForwardIos } from 'react-icons/md'
import { Link } from 'react-router-dom'
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
        {isGroup === 'true' ? (
          <Avatar size={36} src={`${apiBasePath}/grouppfp/${profilePicUrl}`} />
        ) : (
          <Avatar size={36} src={`${apiBasePath}/grouppfp/default-icon.png`} />
        )}
        <span>{id}</span>
        <span className="group-list__group-name">{groupName}</span>
        <span>
          <Link
            to={`/admin/groups/${id}`}
            style={{
              textDecoration: 'none',
              color: 'var(--clr-neutral-900)',
              display: 'block',
              width: '100%',
            }}
          >
            <MdArrowForwardIos title="Go to group page" />
          </Link>
        </span>
      </div>
      {shouldShowMembers && (
        <div className="group-list__container control-panel__card">
          {isGroup === 'true' ? (
            <p className="fw-bold">Group Chat</p>
          ) : (
            <p className="fw-bold">Private Chat</p>
          )}
          <div className="group-list__member-list">
            {groupMembers.groupMembers.length === 0 ? <p>No Members</p> : ''}
            {groupMembers.groupMembers.map((member) => (
              <Link
                to={`/profile/${member.id}`}
                key={member.id}
                style={{
                  textDecoration: 'none',
                  color: 'var(--clr-neutral-900)',
                  display: 'block',
                  width: '100%',
                }}
              >
                <div className="group-list__member control-panel__card">
                  <Avatar
                    size={24}
                    src={`${apiBasePath}/pfp/${member.profile_img}`}
                  />
                  <span>{`${member.first_name} ${member.last_name}`}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
