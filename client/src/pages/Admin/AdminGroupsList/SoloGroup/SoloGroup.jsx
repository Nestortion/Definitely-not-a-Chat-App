import './solo-group.scss'
import { Link, useParams } from 'react-router-dom'
import Avatar from '../../../../components/UI/Avatar/Avatar'
import { useReportedChatQuery } from '../../../../graphql/hooks/graphql'
import LoadingSpinner from '../../../../components/Loading/LoadingSpinner/LoadingSpinner'
import ErrorText from '../../../../components/Error/ErrorText'
import { apiBasePath } from '../../../../data/config'
import { useState } from 'react'
import Button from '../../../../components/UI/Button/Button'
import SpawnModal from '../../../../components/UI/Modal/SpawnModal'
import { toast } from 'react-toastify'

const dummyGroupData = {
  hasThreat: true,
}

const dummyGroupMessages = [
  {
    id: 1,
    message: 'hello',
    messageType: 'TEXT',
    createdAt: '2023-01-30 10:36:55',
    senderId: 1,
    senderName: 'John Doe',
    senderProfileUrl: 'http://localhost:4000/pfp/default-icon.png',
  },
  {
    id: 2,
    message: 'bobo mo po',
    messageType: 'TEXT',
    createdAt: '2023-01-30 10:36:55',
    senderId: 1,
    senderName: 'John Doe',
    senderProfileUrl: 'http://localhost:4000/pfp/default-icon.png',
  },
  {
    id: 3,
    message: 'hello',
    messageType: 'TEXT',
    createdAt: '2023-01-30 10:36:55',
    senderId: 1,
    senderName: 'John Doe',
    senderProfileUrl: 'http://localhost:4000/pfp/default-icon.png',
  },
]

export default function SoloGroup() {
  const { groupId } = useParams()
  const notify = () =>
    toast('Successfully set to inspected!', {
      position: toast.POSITION.TOP_CENTER,
      style: {
        color: 'var(--clr-neutral-100)',
        backgroundColor: 'var(--clr-primary-400)',
        fontSize: 'clamp(0.8rem, 1.3vw, 1.5rem)',
      },
    })
  const [shouldShowMessages, setShouldShowMessages] = useState(
    dummyGroupData.hasThreat
  )
  const [shouldShowModal, setShouldShowModal] = useState(false)

  const {
    data: group,
    loading: groupLoading,
    error: groupError,
  } = useReportedChatQuery({ variables: { groupId: parseInt(groupId) } })

  const hideModal = () => {
    setShouldShowModal(false)
  }

  const showModal = () => {
    setShouldShowModal(true)
  }

  const handleSetToInspected = () => {
    console.log(`Set group: ${groupId} hasThreat to false`)
    hideModal()
    notify()
  }

  if (groupLoading) return <LoadingSpinner />
  if (groupError) return <ErrorText>Something went wrong</ErrorText>

  return (
    <>
      {shouldShowModal && (
        <SpawnModal title="Confirm" closeModal={hideModal}>
          <div className="confirm-modal">
            <p className="fw-bold">Are you sure?</p>
            <div className="confirm-modal__button-group">
              <Button onClick={handleSetToInspected}>Yes</Button>
              <Button onClick={hideModal} secondary>
                No
              </Button>
            </div>
          </div>
        </SpawnModal>
      )}
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

          {shouldShowMessages && (
            <div className="solo-group__has-threat control-panel__card">
              <Button onClick={() => setShouldShowModal(true)}>
                Set to inspected
              </Button>
              <p className="fw-bold fs-500">Chat messages</p>
              <div className="solo-group__messages-container">
                {dummyGroupMessages.map((message) => (
                  <div key={message.id} className="solo-group__message">
                    <Avatar size={24} src={message.senderProfileUrl} />
                    <div className="solo-group__message-sender-info">
                      <span>{message.senderName}</span>
                      <span>{message.createdAt}</span>
                    </div>
                    <span>{message.message}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
