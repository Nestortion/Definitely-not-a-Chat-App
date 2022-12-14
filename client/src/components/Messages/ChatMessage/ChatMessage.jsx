import './chat-message.scss'
import { apiBasePath } from '../../../data/config'
import Avatar from '../../UI/Avatar/Avatar'
import LoadingSpinner from '../../Loading/LoadingSpinner/LoadingSpinner'
import ErrorText from '../../Error/ErrorText'
import { useUserChatSenderQuery } from '../../../graphql/hooks/graphql'
import { useEffect, useRef, useState } from 'react'
import CustomImage from '../../UI/Image/CustomImage'
import { MdDownload } from 'react-icons/md'
import SpawnModal from '../../UI/Modal/SpawnModal'

export default function ChatMessage({
  text,
  sender,
  user,
  message_type,
  is_group,
}) {
  const [shouldShowModal, setShouldShowModal] = useState(false)
  const messageDiv = useRef(null)

  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useUserChatSenderQuery({ variables: { userId: sender } })
  useEffect(() => {
    messageDiv.current?.scrollIntoView()
  }, [text])

  if (userLoading) return <LoadingSpinner>Loading</LoadingSpinner>
  if (userError) return <ErrorText>Error</ErrorText>

  const senderShouldShow = is_group === 'true' && sender !== user

  let newText = text

  if (message_type === 'OTHER' || message_type === 'IMAGE') {
    let unique = text.split(' ')[0]
    newText = text.split(`${unique} `)[1]
  }

  const handleShowModal = () => {
    setShouldShowModal(true)
  }

  const handleHideModal = () => {
    setShouldShowModal(false)
  }

  return (
    <>
      {shouldShowModal && (
        <SpawnModal title={newText} closeModal={handleHideModal}>
          <img src={`${apiBasePath}/message/images/${text}`} />
        </SpawnModal>
      )}
      <div
        ref={messageDiv}
        className={`chat-message fs-400 ${sender === user ? 'you' : 'other'}`}
      >
        {senderShouldShow && (
          <div className="chat-message-sender__image">
            {/* TODO: src should be dynamic */}
            <Avatar
              size={16}
              src={`${apiBasePath}/pfp/${userData.userChatSender.profile_img}`}
            />
          </div>
        )}

        <div className="chat-message-container">
          {senderShouldShow && (
            <div className="chat-message-sender__name fs-300">
              <span>{userData.userChatSender.first_name}</span>
            </div>
          )}

          <div
            className={`chat-message-message text-neutral-100 ${
              sender === user ? 'you' : 'other'
            }`}
          >
            {/* If type image */}
            {message_type === 'IMAGE' && (
              <CustomImage
                src={`${apiBasePath}/message/images/${text}`}
                onClick={handleShowModal}
              />
            )}

            {/* If type other */}
            {message_type === 'OTHER' && (
              <a href={`${apiBasePath}/message/documents/${text}`} download>
                <span>
                  {newText} <MdDownload style={{ display: 'inline-block' }} />
                </span>
              </a>
            )}

            {/* If type text */}
            {message_type === 'TEXT' && (
              <span className="chat-message-message__text">{text}</span>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
