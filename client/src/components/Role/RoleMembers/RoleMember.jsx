import { useMediaQuery } from 'react-responsive'
import { useNavigate, useParams } from 'react-router-dom'
import { apiBasePath } from '../../../data/config'
import Avatar from '../../UI/Avatar/Avatar'
import './role-member.scss'
import { MdSettings } from 'react-icons/md'
import {
  useCurrentUserGroupRolesQuery,
  useRemoveMemberMutation,
} from '../../../graphql/hooks/graphql'
import LoadingSpinner from '../../Loading/LoadingSpinner/LoadingSpinner'
import ErrorText from '../../Error/ErrorText'
import SpawnModal from '../../UI/Modal/SpawnModal'
import { useState } from 'react'

export default function RoleMember({ id, name, pfp, showOnlyMiddle, isGroup }) {
  const [shouldShowModal, setShouldShowModal] = useState(false)
  const { chatId } = useParams()
  const navigate = useNavigate()
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 961px)' })
  const [removeMember] = useRemoveMemberMutation()
  const {
    data: userRoles,
    loading,
    error,
  } = useCurrentUserGroupRolesQuery({
    variables: { groupId: parseInt(chatId) },
  })

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorText>Error</ErrorText>

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

  const handleUserSettings = () => {
    console.log(id)
  }

  const handleRemoveMember = () => {
    removeMember({ variables: { userId: id, groupId: parseInt(chatId) } })
  }

  return (
    <>
      {shouldShowModal && (
        <SpawnModal title="Edit user" closeModal={handleHideModal}>
          <h1>Edit User Role</h1>
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
        {isGroup === 'true' &&
          userRoles.currentUserGroupRoles.roles.includes('MODERATOR') && (
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
