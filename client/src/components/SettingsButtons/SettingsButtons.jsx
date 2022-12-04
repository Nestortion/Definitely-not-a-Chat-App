import './settings-buttons.scss'
import Button from '../UI/Button/Button'
import { MdAdd, MdSearch, MdReport } from 'react-icons/md'
import SpawnModal from '../UI/Modal/SpawnModal'
import AddMembers from './AddMembers/AddMembers'
import { useState } from 'react'
import { useEffect } from 'react'

export default function SettingsButtons() {
  const [shouldShowModal, setShouldShowModal] = useState(false)
  const [shouldShowAddMembers, setShouldShowAddMembers] = useState(false)
  const [shouldShowAddRoles, setShouldShowAddRoles] = useState(false)
  const [shouldShowSearchInGroup, setShouldShowSearchInGroup] = useState(false)
  const [shouldShowReportChat, setShouldShowReportChat] = useState(false)
  const [currentTitle, setCurrentTitle] = useState()

  const handleShowModal = () => {
    setShouldShowModal(true)
  }

  const handleHideModal = () => {
    setShouldShowModal(false)
    setShouldShowAddMembers(false)
    setShouldShowAddRoles(false)
    setShouldShowSearchInGroup(false)
    setShouldShowReportChat(false)
  }

  const showAddMembers = () => {
    setShouldShowAddMembers(true)
    setCurrentTitle('Add Members')
    handleShowModal()
  }

  const showAddRoles = () => {
    setShouldShowAddRoles(true)
    setCurrentTitle('Add Roles')
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

  return (
    <>
      {shouldShowModal && (
        <SpawnModal title={currentTitle} closeModal={handleHideModal}>
          {shouldShowAddMembers && <AddMembers />}
          {shouldShowAddRoles && <span>Add Roles</span>}
          {shouldShowSearchInGroup && <span>Search</span>}
          {shouldShowReportChat && <span>Report</span>}
        </SpawnModal>
      )}
      <div className="settings-buttons">
        <Button onClick={showAddMembers}>
          <MdAdd style={{ display: 'inline-block' }} />
          <span>Add Members</span>
        </Button>
        <Button onClick={showAddRoles}>
          <MdAdd style={{ display: 'inline-block' }} />
          <span>Add Roles</span>
        </Button>
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
