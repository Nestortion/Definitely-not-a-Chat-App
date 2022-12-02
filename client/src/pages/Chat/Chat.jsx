import './chat.scss'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import Avatar from '../../components/UI/Avatar/Avatar'
// ! FETCH HERE
// id is from the url parameter (e.g. /chat/:chatId)
// set global chat state here
import { useMediaQuery } from 'react-responsive'
import {
  useAddUserChatMutation,
  useGroupQuery,
  UserChatsDocument,
} from '../../graphql/hooks/graphql'
import { useParams } from 'react-router-dom'
import { apiBasePath } from '../../data/config'
import LoadingSpinner from '../../components/Loading/LoadingSpinner/LoadingSpinner'
import ErrorText from '../../components/Error/ErrorText'
import FileInput from '../../components/FileInput/FileInput'
import { useState, useRef } from 'react'
import { MdAdd } from 'react-icons/md'
import ChatMessages from '../../components/Messages/ChatMessages/ChatMessages'

export default function Chat() {
  const { chatId } = useParams()
  const formRef = useRef()
  const { data, loading, error } = useGroupQuery({
    variables: { groupId: parseInt(chatId) },
  })
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 961px)' })
  const [fileInput, setFileInput] = useState(null)
  const [message, setMessage] = useState('')
  const [sendMessage] = useAddUserChatMutation()
  if (loading) return <LoadingSpinner>loading</LoadingSpinner>
  if (error) return <ErrorText>Something went wrong</ErrorText>

  const fileChangeHandle = ({
    target: {
      validity,
      files: [file],
    },
  }) => {
    if (validity.valid) setFileInput(file)
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
        <Button>
          <MdAdd />
        </Button>
      </div>
      <div className="chat-messages-container">
        <ChatMessages />
      </div>
      <div className="chat-input-container">
        {/* I dont know what form data should be (multipart, etc..) */}
        <form
          ref={formRef}
          onSubmit={sendMessageHandle}
          className="chat-input-container__form"
        >
          <FileInput onChange={fileChangeHandle} />
          <Input value={message} onChange={messageChangeHandle} type="text" />
          <Button>Send</Button>
        </form>
      </div>
    </div>
  )
}
