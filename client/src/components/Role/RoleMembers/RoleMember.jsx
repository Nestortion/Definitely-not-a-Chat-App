import { useMediaQuery } from 'react-responsive'
import { useNavigate, useParams } from 'react-router-dom'
import { apiBasePath } from '../../../data/config'
import Avatar from '../../UI/Avatar/Avatar'
import './role-member.scss'
import { MdSettings } from 'react-icons/md'
import { useRemoveMemberMutation } from '../../../graphql/hooks/graphql'
import SpawnModal from '../../UI/Modal/SpawnModal'
import { useState } from 'react'
import EditUserRole from '../EditUserRole/EditUserRole'
import { toast } from 'react-toastify'

export default function RoleMember({
  id,
  name,
  pfp,
  showOnlyMiddle,
  isGroup,
  userRoles,
}) {
  const notify = () =>
    toast('Member removed', {
      position: toast.POSITION.TOP_CENTER,
      style: {
        color: 'var(--clr-neutral-100)',
        backgroundColor: 'var(--clr-primary-400)',
        fontSize: 'clamp(0.8rem, 1.3vw, 1.5rem)',
      },
    })

  const [shouldShowModal, setShouldShowModal] = useState(false)
  const { chatId } = useParams()
  const navigate = useNavigate()
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 961px)' })
  const [removeMember] = useRemoveMemberMutation()

  const navigateToProfile = () => {
    if (isTabletOrMobile) {
      showOnlyMiddle()
    }
    navigate(`/profile/${id}`)
  }

  const handleShowModal = () => {
    setShouldShowModal(true)
  }

  const handleHideModal = () => {
    setShouldShowModal(false)
  }

  const handleRemoveMember = () => {
    removeMember({ variables: { userId: id, groupId: parseInt(chatId) } })
    notify()
  }

  return (
    <>
      {shouldShowModal && (
        <SpawnModal title={`Edit user - ${name}`} closeModal={handleHideModal}>
          <EditUserRole
            memberId={id}
            closeModal={handleHideModal}
            handleRemoveMember={handleRemoveMember}
          />
        </SpawnModal>
      )}
      <div className="role-member">
        <div className="role-member__info">
          <Avatar
            size={20}
            src={`${apiBasePath}/pfp/${pfp}`}
            onClick={navigateToProfile}
          />
          <span className="fs-400">{name}</span>
        </div>
        {isGroup === 'true' && userRoles.includes('MODERATOR') && (
          <>
            <button
              className="fs-300 bg-secondary-400 text-neutral-100 role-member__button"
              onClick={handleShowModal}
            >
              <MdSettings />
            </button>
          </>
        )}
      </div>
    </>
  )
}
