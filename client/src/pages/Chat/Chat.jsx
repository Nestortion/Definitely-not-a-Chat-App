import './chat.scss'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import Avatar from '../../components/UI/Avatar/Avatar'
import { useMediaQuery } from 'react-responsive'
import {
  useAddUserChatMutation,
  useGroupQuery,
  UserChatsDocument,
  useUserGroupRolesQuery,
} from '../../graphql/hooks/graphql'
import { useParams } from 'react-router-dom'
import { apiBasePath } from '../../data/config'
import LoadingSpinner from '../../components/Loading/LoadingSpinner/LoadingSpinner'
import ErrorText from '../../components/Error/ErrorText'
import FileInput from '../../components/FileInput/FileInput'
import { useState, useRef } from 'react'
import { MdAdd, MdClose } from 'react-icons/md'
import ChatMessagesContainer from '../../components/Messages/ChatMessagesContainer/ChatMessagesContainer'

export default function Chat() {
  const { chatId } = useParams()
  const formRef = useRef()
  const { data, loading, error } = useGroupQuery({
    variables: { groupId: parseInt(chatId) },
  })
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 961px)' })
  const [fileInput, setFileInput] = useState(null)
  const [message, setMessage] = useState('')
  const [sendMessage] = useAddUserChatMutation({
    refetchQueries: [{ query: UserChatsDocument }],
  })
  const {
    data: roles,
    loading: rolesLoading,
    error: rolesError,
  } = useUserGroupRolesQuery({ variables: { groupId: parseInt(chatId) } })

  if (rolesLoading) return <LoadingSpinner />
  if (rolesError) return <ErrorText>Error</ErrorText>
  if (loading) return <LoadingSpinner />
  if (error) return <ErrorText>Something went wrong</ErrorText>

  const fileChangeHandle = ({
    target: {
      validity,
      files: [file],
    },
  }) => {
    // 2e9 is 2GB
    if (validity.valid && file?.size < 2e9) {
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

  return (
    <div className={`chat ${isTabletOrMobile && 'small-screen'}`}>
      <div className="header">
        <div className="chat-info">
          <Avatar
            src={`${apiBasePath}/pfp/${data.group.group_picture}`}
            alt={`${data.group.group_name}'s photo`}
            size="40"
          />
          <span>{data.group.group_name}</span>
        </div>
        {(data.group.is_group === 'false' ||
          roles.userGroupRoles?.some((e) => e.role_type === 'MODERATOR')) && (
          <Button>
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
          <Input value={message} onChange={messageChangeHandle} type="text" />
          <Button>Send</Button>
        </form>
      </div>
    </div>
  )
}
