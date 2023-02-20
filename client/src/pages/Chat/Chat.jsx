import './chat.scss'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import Avatar from '../../components/UI/Avatar/Avatar'
import { useMediaQuery } from 'react-responsive'
import {
  GroupUpdateDocument,
  ReportedChatDocument,
  useAddUserChatMutation,
  useCurrentUserGroupRolesQuery,
  useGroupQuery,
  useOtherUserQuery,
  UserChatsDocument,
} from '../../graphql/hooks/graphql'
import { Link, useOutletContext, useParams } from 'react-router-dom'
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
import { toast } from 'react-toastify'

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
  const [isSending, setIsSending] = useState(false)

  const warn = (text) =>
    toast(text, {
      position: toast.POSITION.TOP_CENTER,
      style: {
        color: 'var(--clr-neutral-100)',
        backgroundColor: 'var(--clr-error-400)',
        fontSize: 'clamp(0.8rem, 1.3vw, 1.5rem)',
      },
    })

  const {
    data: otherUser,
    loading: otherUserLoading,
    error: otherUserError,
  } = useOtherUserQuery({ variables: { groupId: parseInt(chatId) } })

  const [sendMessage] = useAddUserChatMutation({
    refetchQueries: [{ query: UserChatsDocument }],
    update: (cache, { data }) => {
      const reportedChatData = cache.readQuery({
        query: ReportedChatDocument,
        variables: { groupId: parseInt(chatId) },
      })

      if (reportedChatData) {
        cache.writeQuery({
          query: ReportedChatDocument,
          variables: { groupId: parseInt(chatId) },
          data: {
            reportedChat: {
              ...reportedChatData.reportedChat,
              chat_messages: [
                ...reportedChatData.reportedChat.chat_messages,
                data.addUserChat,
              ],
            },
          },
        })
      }
    },
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

    // if (validity.valid && file?.mimetype < MAX_FILE_SIZE) {
    //   setFileInput(file)
    // } else {
    //   warn('Error: File too large')
    //   return
    // }

    if (validity.valid && file?.size < MAX_FILE_SIZE) {
      setFileInput(file)
    } else {
      warn('Error: File too large')
      return
    }
  }

  const messageChangeHandle = (e) => {
    setMessage(e.target.value)
  }

  const sendMessageHandle = (e) => {
    e.preventDefault()
    setIsSending(true)
    if (fileInput?.type.includes('video')) {
      warn('Error: Videos are not allowed! Please change your file!')
      return
    }

    if (fileInput && message) {
      sendMessage({
        variables: {
          file: fileInput,
          receiver: parseInt(chatId),
        },
      }).then(() => {
        setIsSending(false)
      })
      sendMessage({
        variables: {
          message: message,
          receiver: parseInt(chatId),
        },
      }).then(() => {
        setIsSending(false)
      })
    } else if (fileInput != null) {
      sendMessage({
        variables: {
          file: fileInput,
          receiver: parseInt(chatId),
        },
      }).then(() => {
        setIsSending(false)
      })
    } else {
      if (message !== '') {
        sendMessage({
          variables: {
            message: message,
            receiver: parseInt(chatId),
          },
        }).then(() => {
          setIsSending(false)
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
            <Link
              to={`/profile/${otherUser.otherUser.id}`}
              style={{
                textDecoration: 'none',
                color: 'var(--clr-neutral-900)',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
              }}
            >
              <Avatar
                src={`${apiBasePath}/pfp/${otherUser.otherUser.profile_img}`}
                alt={`${data.group.group_name}'s photo`}
                size="40"
              />
              <span>{`${otherUser.otherUser.first_name} ${otherUser.otherUser.last_name}`}</span>
            </Link>
          )}
        </div>
        {isModalShowing && (
          <SpawnModal title="Add members" closeModal={closeModal}>
            <AddMembers closeModal={closeModal} />
          </SpawnModal>
        )}
        {(data.group.is_group === 'false' ||
          roles.currentUserGroupRoles.roles.includes('MODERATOR')) && (
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
          <Button green={isSending}>{isSending ? 'Sending...' : 'Send'}</Button>
        </form>
      </div>
    </div>
  )
}
