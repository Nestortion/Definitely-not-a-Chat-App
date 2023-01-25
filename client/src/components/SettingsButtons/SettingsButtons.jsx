import './settings-buttons.scss'
import Button from '../UI/Button/Button'
import {
  MdAdd,
  MdSearch,
  MdReport,
  MdTextFields,
  MdSettings,
  MdEmojiPeople,
} from 'react-icons/md'
import SpawnModal from '../UI/Modal/SpawnModal'
import { useState } from 'react'
import AddMembers from './AddMembers/AddMembers'
import GroupSettings from './EditGroupName/EditGroupName'
import SearchInChat from './SearchInChat/SearchInChat'
import ReportChat from './ReportChat/ReportChat'
import EditGeneralRoles from './EditRoles/EditGeneralRoles'
import { useAtom } from 'jotai'
import { isSearching } from '../../App'

export default function SettingsButtons({ userRoles, isGroup, rolesList }) {
  const [userIsSearching, setUserIsSearching] = useAtom(isSearching)

  const [shouldShowModal, setShouldShowModal] = useState(false)
  const [shouldShowAddMembers, setShouldShowAddMembers] = useState(false)
  const [shouldShowGeneralRoles, setShouldShowGeneralRoles] = useState(false)
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
    setShouldShowGeneralRoles(false)
    setShouldShowEditGroupName(false)
    // setShouldShowSearchInGroup(false)
    setShouldShowReportChat(false)
  }

  const showAddMembers = () => {
    setShouldShowAddMembers(true)
    setCurrentTitle('Add Members')
    handleShowModal()
  }

  const showGeneralRoles = () => {
    setShouldShowGeneralRoles(true)
    setCurrentTitle('Edit Roles')
    handleShowModal()
  }

  const showEditRoles = () => {
    setShouldShowEditGroupName(true)
    setCurrentTitle('Group Settings')
    handleShowModal()
  }

  // const showSearchInGroup = () => {
  //   setShouldShowSearchInGroup(true)
  //   setCurrentTitle('Search in Group')
  //   handleShowModal()
  // }

  const showReportChat = () => {
    setShouldShowReportChat(true)
    setCurrentTitle('Report Chat')
    handleShowModal()
  }

  return (
    <>
      {shouldShowModal && (
        <SpawnModal title={currentTitle} closeModal={handleHideModal}>
          {shouldShowAddMembers && <AddMembers closeModal={handleHideModal} />}
          {shouldShowGeneralRoles && (
            <EditGeneralRoles
              rolesList={rolesList}
              closeModal={handleHideModal}
            />
          )}
          {shouldShowEditGroupName && (
            <GroupSettings closeModal={handleHideModal} />
          )}
          {/* {shouldShowSearchInGroup && (
            <SearchInChat closeModal={handleHideModal} />
          )}
          {shouldShowReportChat && <ReportChat closeModal={handleHideModal} />} */}
        </SpawnModal>
      )}
      <div className="settings-buttons">
        {isGroup === 'true' && userRoles.some((e) => e === 'MODERATOR') && (
          <>
            <Button onClick={showAddMembers}>
              <MdAdd style={{ display: 'inline-block' }} />
              <span className="fs-400">Add Members</span>
            </Button>
            <Button onClick={showGeneralRoles}>
              <MdEmojiPeople style={{ display: 'inline-block' }} />
              <span className="fs-400">Edit Roles</span>
            </Button>
            <Button onClick={showEditRoles}>
              <MdSettings style={{ display: 'inline-block' }} />
              <span className="fs-400">Group Settings</span>
            </Button>
          </>
        )}

        <Button onClick={() => setUserIsSearching(true)}>
          <MdSearch style={{ display: 'inline-block' }} />
          <span className="fs-400">Search in Chat</span>
        </Button>
        <Button onClick={showReportChat}>
          <MdReport style={{ display: 'inline-block' }} />
          <span className="fs-400">Report Chat</span>
        </Button>
      </div>
    </>
  )
}
