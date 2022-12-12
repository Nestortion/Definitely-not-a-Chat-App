import './settings-buttons.scss'
import Button from '../UI/Button/Button'
import { MdAdd, MdSearch, MdReport, MdTextFields } from 'react-icons/md'
import SpawnModal from '../UI/Modal/SpawnModal'
import EditMembers from './AddMembers/EditMembers'
import { useState } from 'react'

export default function SettingsButtons({ roles, isGroup }) {
  const [shouldShowModal, setShouldShowModal] = useState(false)
  const [shouldShowAddMembers, setShouldShowAddMembers] = useState(false)
  const [shouldShowEditGroupName, setShouldShowEditGroupName] = useState(false)
  const [shouldShowSearchInGroup, setShouldShowSearchInGroup] = useState(false)
  const [shouldShowReportChat, setShouldShowReportChat] = useState(false)
  const [currentTitle, setCurrentTitle] = useState()

  const handleShowModal = () => {
    setShouldShowModal(true)
  }

  const handleHideModal = () => {
    setShouldShowModal(false)
    setShouldShowAddMembers(false)
    setShouldShowEditGroupName(false)
    setShouldShowSearchInGroup(false)
    setShouldShowReportChat(false)
  }

  const showEditMembers = () => {
    setShouldShowAddMembers(true)
    setCurrentTitle('Add Members')
    handleShowModal()
  }

  const showEditRoles = () => {
    setShouldShowEditGroupName(true)
    setCurrentTitle('Edit Group Name')
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
          {shouldShowAddMembers && <EditMembers />}
          {shouldShowEditGroupName && <span>Edit Group Name</span>}
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
                <span>Add Members</span>
              </Button>
              <Button onClick={showEditRoles}>
                <MdTextFields style={{ display: 'inline-block' }} />
                <span>Edit Group Name</span>
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
