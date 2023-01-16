import './chat.scss'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import Avatar from '../../components/UI/Avatar/Avatar'
import { useMediaQuery } from 'react-responsive'
import {
  GroupUpdateDocument,
  useAddUserChatMutation,
  useCurrentUserGroupRolesQuery,
  useGroupQuery,
  useOtherUserQuery,
  UserChatsDocument,
} from '../../graphql/hooks/graphql'
import { useOutletContext, useParams } from 'react-router-dom'
import { apiBasePath } from '../../data/config'
import LoadingSpinner from '../../components/Loading/LoadingSpinner/LoadingSpinner'
import ErrorText from '../../components/Error/ErrorText'
import FileInput from '../../components/FileInput/FileInput'
import { useState, useRef } from 'react'
import { MdAdd, MdClose } from 'react-icons/md'
import ChatMessagesContainer from '../../components/Messages/ChatMessagesContainer/ChatMessagesContainer'
import SpawnModal from '../../components/UI/Modal/SpawnModal'
import AddMembers from '../../components/SettingsButtons/AddMembers/AddMembers'
import { useEffect } from 'react'

export default function Chat() {
  const { chatId } = useParams()
  const user = useOutletContext()
  const formRef = useRef()
  const { data, loading, error, subscribeToMore } = useGroupQuery({
    variables: { groupId: parseInt(chatId) },
  })
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 961px)' })
  const [fileInput, setFileInput] = useState(null)
  const [message, setMessage] = useState('')
  const [isModalShowing, setIsModalShowing] = useState(false)

  const {
    data: otherUser,
    loading: otherUserLoading,
    error: otherUserError,
  } = useOtherUserQuery({ variables: { groupId: parseInt(chatId) } })

  const [sendMessage] = useAddUserChatMutation({
    refetchQueries: [{ query: UserChatsDocument }],
  })
  const {
    data: roles,
    loading: rolesLoading,
    error: rolesError,
  } = useCurrentUserGroupRolesQuery({
    variables: { groupId: parseInt(chatId) },
  })

  useEffect(() => {
    subscribeToMore({
      document: GroupUpdateDocument,
      variables: { user: user.currentUser.id },
    })
  }, [])

  if (rolesLoading) return <LoadingSpinner />
  if (rolesError) return <ErrorText>Unauthorized</ErrorText>
  if (otherUserLoading) return <LoadingSpinner />
  if (otherUserError) return <ErrorText>Error</ErrorText>
  if (loading) return <LoadingSpinner />
  if (error) return <ErrorText>Something went wrong</ErrorText>

  const fileChangeHandle = ({
    target: {
      validity,
      files: [file],
    },
  }) => {
    const MAX_FILE_SIZE = 2e7 // 20MB

    if (validity.valid && file?.size < MAX_FILE_SIZE) {
      setFileInput(file)
    }
  }

  const messageChangeHandle = (e) => {
    setMessage(e.target.value)
  }

  const sendMessageHandle = (e) => {
    e.preventDefault()
    if (fileInput && message) {
      sendMessage({
        variables: {
          file: fileInput,
          receiver: parseInt(chatId),
        },
      })
      sendMessage({
        variables: {
          message: message,
          receiver: parseInt(chatId),
        },
      })
    } else if (fileInput != null) {
      sendMessage({
        variables: {
          file: fileInput,
          receiver: parseInt(chatId),
        },
      })
    } else {
      if (message !== '') {
        sendMessage({
          variables: {
            message: message,
            receiver: parseInt(chatId),
          },
        })
      }
    }
    setFileInput(null)
    setMessage('')
  }

  const showModal = () => {
    setIsModalShowing(true)
  }

  const closeModal = () => {
    setIsModalShowing(false)
  }

  return (
    <div className={`chat ${isTabletOrMobile && 'small-screen'}`}>
      <div className="header">
        <div className="chat-info">
          {data.group.is_group === 'true' ? (
            <>
              <Avatar
                src={`${apiBasePath}/grouppfp/${data.group.group_picture}`}
                alt={`${data.group.group_name}'s photo`}
                size="40"
              />
              <span>{data.group.group_name}</span>
            </>
          ) : (
            <>
              <Avatar
                src={`${apiBasePath}/pfp/${otherUser.otherUser.profile_img}`}
                alt={`${data.group.group_name}'s photo`}
                size="40"
              />
              <span>{`${otherUser.otherUser.first_name} ${otherUser.otherUser.last_name}`}</span>
            </>
          )}
        </div>
        {isModalShowing && (
          <SpawnModal title="Add members" closeModal={closeModal}>
            <AddMembers closeModal={closeModal} />
          </SpawnModal>
        )}
        {(data.group.is_group === 'false' ||
          roles.currentUserGroupRoles.roles.some(
            (e) => e.role_type === 'MODERATOR'
          )) && (
          <Button onClick={showModal}>
            <MdAdd />
          </Button>
        )}
      </div>
      <ChatMessagesContainer />
      <div className="chat-input-container">
        <form
          ref={formRef}
          onSubmit={sendMessageHandle}
          className="chat-input-container__form"
        >
          <FileInput onChange={fileChangeHandle} />
          {fileInput && (
            <div className="chat-input-container__selected-file fs-300">
              <span>
                {fileInput.name}{' '}
                <span
                  style={{ cursor: 'pointer' }}
                  onClick={() => setFileInput(null)}
                >
                  <MdClose />
                </span>
              </span>
            </div>
          )}
          <input
            type="text"
            value={message}
            onChange={messageChangeHandle}
            className="chat-box"
          />
          <Button>Send</Button>
        </form>
      </div>
    </div>
  )
}
