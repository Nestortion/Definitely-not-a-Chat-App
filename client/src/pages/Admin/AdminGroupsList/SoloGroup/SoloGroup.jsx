import './solo-group.scss'
import { Link, useParams } from 'react-router-dom'
import Avatar from '../../../../components/UI/Avatar/Avatar'
import { useReportedChatQuery } from '../../../../graphql/hooks/graphql'
import LoadingSpinner from '../../../../components/Loading/LoadingSpinner/LoadingSpinner'
import ErrorText from '../../../../components/Error/ErrorText'
import { apiBasePath } from '../../../../data/config'

export default function SoloGroup() {
  const { groupId } = useParams()

  const {
    data: group,
    loading: groupLoading,
    error: groupError,
  } = useReportedChatQuery({ variables: { groupId: parseInt(groupId) } })

  if (groupLoading) return <LoadingSpinner />
  if (groupError) return <ErrorText>Something went wrong</ErrorText>

  return (
    <div className="solo-group">
      <div className="solo-group__container control-panel__card">
        <p className="solo-group__heading fw-bold">Group Details</p>

        <Avatar
          size={128}
          src={`${apiBasePath}/grouppfp/${
            group.reportedChat.group_data.is_group === 'true'
              ? group.reportedChat.group_data.group_picture
              : 'default-icon.png'
          }`}
        />

        <p className="solo-group__group-detail">
          <span>Group Id:</span>
          <span>{group.reportedChat.group_data.id}</span>
        </p>

        <p className="solo-group__group-detail">
          <span>Group Name:</span>
          <span>{group.reportedChat.group_data.group_name}</span>
        </p>

        <p className="solo-group__group-detail">
          <span>Chat Type: </span>
          <span>
            {group.reportedChat.group_data.is_group === 'true'
              ? 'Group Chat'
              : 'Private Chat'}
          </span>
        </p>

        {group.reportedChat.group_data.is_group === 'true' ? (
          <>
            <p className="solo-group__group-detail">
              <span>Group Roles: </span>
            </p>
            {group.reportedChat.roleMembers.map((role) => (
              <div
                className="solo-group__role-container control-panel__card"
                key={role.role.id}
              >
                <p className="solo-group__role-detail">
                  <span className="fw-bold">{role.role.role_name}</span>
                </p>

                <p className="solo-group__role-detail">
                  <span className="fs-400">{role.role.role_type}</span>
                </p>

                <div className="solo-group__role-member-container">
                  {role.members.map((member) => (
                    <Link
                      key={member.id}
                      to={`/profile/${member.id}`}
                      style={{
                        textDecoration: 'none',
                        color: 'var(--clr-neutral-900)',
                        display: 'block',
                        width: '100%',
                      }}
                    >
                      <div className="solo-group__role-member hoverable control-panel__card">
                        <Avatar
                          size={36}
                          src={`${apiBasePath}/pfp/${member.profile_img}`}
                        />
                        <p>{`${member.first_name} ${member.last_name}`}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            <div className="solo-group__role-container control-panel__card">
              <p className="solo-group__role-detail">
                <span className="fw-bold">{'MEMBERS'}</span>
              </p>

              <div className="solo-group__role-member-container">
                {group.reportedChat.allMembers.map((member) => (
                  <Link
                    key={member.id}
                    to={`/profile/${member.id}`}
                    style={{
                      textDecoration: 'none',
                      color: 'var(--clr-neutral-900)',
                      display: 'block',
                      width: '100%',
                    }}
                  >
                    <div className="solo-group__role-member hoverable control-panel__card">
                      <Avatar
                        size={36}
                        src={`${apiBasePath}/pfp/${member.profile_img}`}
                      />
                      <p>{`${member.first_name} ${member.last_name}`}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
