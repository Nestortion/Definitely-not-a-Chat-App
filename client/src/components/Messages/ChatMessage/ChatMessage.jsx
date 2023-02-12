import './chat-message.scss'
import { apiBasePath } from '../../../data/config'
import Avatar from '../../UI/Avatar/Avatar'
import LoadingSpinner from '../../Loading/LoadingSpinner/LoadingSpinner'
import ErrorText from '../../Error/ErrorText'
import { useUserChatSenderQuery } from '../../../graphql/hooks/graphql'
import { useEffect, useRef, useState } from 'react'
import CustomImage from '../../UI/Image/CustomImage'
import { MdDownload, MdWarningAmber } from 'react-icons/md'
import SpawnModal from '../../UI/Modal/SpawnModal'

function validURL(str) {
  // yeah
  var pattern =
    /(([a-z]+:\/\/)?(([a-z0-9\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal))(:[0-9]{1,5})?(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&amp;]*)?)?(#[a-zA-Z0-9!$&'()*+.=-_~:@/?]*)?)(\s+|$)/gi
  return !!pattern.test(str)
}

export default function ChatMessage({
  text,
  sender,
  user,
  message_type,
  is_group,
  messageDate,
}) {
  const [shouldShowModal, setShouldShowModal] = useState(false)
  const messageDiv = useRef(null)
  const [hasUrl, setHasUrl] = useState(false)

  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useUserChatSenderQuery({ variables: { userId: sender } })
  // useEffect(() => {
  //   messageDiv.current?.scrollIntoView()
  // }, [text])

  useEffect(() => {
    if (message_type === 'TEXT' && validURL(text)) {
      setHasUrl(true)
    } else {
      setHasUrl(false)
    }
  }, [])

  if (userLoading) return <LoadingSpinner>Loading</LoadingSpinner>
  if (userError) return <ErrorText>Error</ErrorText>

  const senderShouldShow = is_group === 'true' && sender !== user

  let newText = text

  const convertMessageDate = new Date(messageDate)

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
        <SpawnModal title="" closeModal={handleHideModal}>
          <div className="image-container">
            <img src={`${apiBasePath}/message/images/${text}`} />
          </div>
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

        <div
          className={`chat-message-container ${
            sender === user ? 'you' : 'other'
          }`}
        >
          {senderShouldShow && (
            <div className="chat-message-sender__name fs-300">
              <span>{userData.userChatSender.first_name}</span>
            </div>
          )}
          {/* !-- TODO */}
          <span>
            {Intl.DateTimeFormat('en-US', {
              dateStyle: 'long',
              timeStyle: 'short',
            }).format(convertMessageDate)}
          </span>

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
              <>
                <span className="chat-message-message__text">{text}</span>
                {hasUrl && (
                  <p
                    className="text-error-400"
                    style={{
                      backgroundColor: '#ffffff',
                    }}
                  >
                    <MdWarningAmber style={{ display: 'inline-block' }} />{' '}
                    Please be cautious when clicking on links from unknown
                    sources
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
