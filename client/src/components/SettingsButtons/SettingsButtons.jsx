import './settings-buttons.scss'
import Button from '../UI/Button/Button'
import { MdAdd, MdSearch, MdReport } from 'react-icons/md'
import SpawnModal from '../UI/Modal/SpawnModal'
import EditMembers from './AddMembers/EditMembers'
import { useState } from 'react'

export default function SettingsButtons({ roles, isGroup }) {
  const [shouldShowModal, setShouldShowModal] = useState(false)
  const [shouldShowEditMembers, setShouldShowEditMembers] = useState(false)
  const [shouldShowEditRoles, setShouldShowEditRoles] = useState(false)
  const [shouldShowSearchInGroup, setShouldShowSearchInGroup] = useState(false)
  const [shouldShowReportChat, setShouldShowReportChat] = useState(false)
  const [currentTitle, setCurrentTitle] = useState()

  const handleShowModal = () => {
    setShouldShowModal(true)
  }

  const handleHideModal = () => {
    setShouldShowModal(false)
    setShouldShowEditMembers(false)
    setShouldShowEditRoles(false)
    setShouldShowSearchInGroup(false)
    setShouldShowReportChat(false)
  }

  const showEditMembers = () => {
    setShouldShowEditMembers(true)
    setCurrentTitle('Edit Members')
    handleShowModal()
  }

  const showEditRoles = () => {
    setShouldShowEditRoles(true)
    setCurrentTitle('Edit Roles')
    handleShowModal()
  }

  const showSearchInGroup = () => {
    setShouldShowSearchInGroup(true)
    setCurrentTitle('Search in Group')
    handleShowModal()
  }

  const showReportChat = () => {
    setShouldShowReportChat(true)
    setCurrentTitle('Report Chat')
    handleShowModal()
  }

  console.log()

  return (
    <>
      {shouldShowModal && (
        <SpawnModal title={currentTitle} closeModal={handleHideModal}>
          {shouldShowEditMembers && <EditMembers />}
          {shouldShowEditRoles && <span>Edit Roles</span>}
          {shouldShowSearchInGroup && <span>Search</span>}
          {shouldShowReportChat && <span>Report</span>}
        </SpawnModal>
      )}
      <div className="settings-buttons">
        {isGroup === 'true' &&
          roles.userGroupRoles.some((e) => e.role_type === 'MODERATOR') && (
            <>
              <Button onClick={showEditMembers}>
                <MdAdd style={{ display: 'inline-block' }} />
                <span>Edit Members</span>
              </Button>
              <Button onClick={showEditRoles}>
                <MdAdd style={{ display: 'inline-block' }} />
                <span>Edit Roles</span>
              </Button>
            </>
          )}

        <Button onClick={showSearchInGroup}>
          <MdSearch style={{ display: 'inline-block' }} />
          <span>Search in Group</span>
        </Button>
        <Button onClick={showReportChat}>
          <MdReport style={{ display: 'inline-block' }} />
          <span>Report Chat</span>
        </Button>
      </div>
    </>
  )
}
