import { useMediaQuery } from 'react-responsive'
import { useNavigate, useParams } from 'react-router-dom'
import { apiBasePath } from '../../../data/config'
import Avatar from '../../UI/Avatar/Avatar'
import './role-member.scss'
import { MdSettings } from 'react-icons/md'
import {
  useRemoveMemberMutation,
  useUserGroupRolesQuery,
} from '../../../graphql/hooks/graphql'
import SpawnModal from '../../UI/Modal/SpawnModal'
import { useState } from 'react'
import EditUserRole from '../EditUserRole/EditUserRole'
import { toast } from 'react-toastify'
import LoadingSpinner from '../../Loading/LoadingSpinner/LoadingSpinner'
import ErrorText from '../../Error/ErrorText'
import { useEffect } from 'react'
import { MemberRolesUpdatedDocument } from '../../../graphql/hooks/graphql'

export default function RoleMember({
  id,
  name,
  pfp,
  showOnlyMiddle,
  isGroup,
  userRoles,
  groupRoles,
  user,
  roleName,
}) {
  const notify = (message) => {
    if (message) {
      return toast(message, {
        position: toast.POSITION.TOP_CENTER,
        style: {
          color: 'var(--clr-neutral-100)',
          backgroundColor: 'var(--clr-primary-400)',
          fontSize: 'clamp(0.8rem, 1.3vw, 1.5rem)',
        },
      })
    }

    return toast('Member removed', {
      position: toast.POSITION.TOP_CENTER,
      style: {
        color: 'var(--clr-neutral-100)',
        backgroundColor: 'var(--clr-primary-400)',
        fontSize: 'clamp(0.8rem, 1.3vw, 1.5rem)',
      },
    })
  }

  const [shouldShowModal, setShouldShowModal] = useState(false)
  const { chatId } = useParams()
  const navigate = useNavigate()
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 961px)' })
  const [removeMember] = useRemoveMemberMutation()
  const {
    data: userGroupRoles,
    loading: userGroupRolesLoading,
    error: userGroupRolesError,
    subscribeToMore,
  } = useUserGroupRolesQuery({
    variables: { groupId: parseInt(chatId), userId: id },
  })

  useEffect(() => {
    subscribeToMore({
      document: MemberRolesUpdatedDocument,
      variables: { user: user.id },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev

        if (subscriptionData.data.memberRolesUpdated.user.id !== id) return prev
        return {
          userGroupRoles: [
            ...subscriptionData.data.memberRolesUpdated.roles_ids,
          ],
        }
      },
    })
  }, [])

  if (userGroupRolesLoading) return <LoadingSpinner />
  if (userGroupRolesError) return <ErrorText>Something Went Wrong</ErrorText>

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

  const handleRemoveMember = async () => {
    const removeRes = await removeMember({
      variables: { userId: id, groupId: parseInt(chatId) },
    })

    if (removeRes.data.removeMember === null) {
      notify('Cannot remove Group Creator')
      return
    }

    notify()
  }

  return (
    <>
      {shouldShowModal && (
        <SpawnModal title={`Edit user - ${name}`} closeModal={handleHideModal}>
          <EditUserRole
            groupRoles={groupRoles}
            userRoles={userGroupRoles.userGroupRoles}
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
        {isGroup === 'true' &&
          userRoles.includes('MODERATOR') &&
          roleName === 'Member' && (
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
