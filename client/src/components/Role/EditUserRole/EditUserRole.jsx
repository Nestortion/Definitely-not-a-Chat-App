import { useState } from 'react'
import Button from '../../UI/Button/Button'
import './edit-user-role.scss'
import { MdWarning } from 'react-icons/md'
import SpawnModal from '../../UI/Modal/SpawnModal'

export default function EditUserRole({
  handleRemoveMember,
  closeModal,
  memberId,
}) {
  // ! Fetch all group roles for the current group first
  const [groupRoles, setGroupRoles] = useState([
    {
      id: 1,
      roleName: 'Member',
      roleType: 'MEMBER',
    },
    {
      id: 2,
      roleName: 'Group Creator',
      roleType: 'MODERATOR',
    },
  ])

  // ! Fetch the current role of the selected user
  const [currentUserRole, setCurrentUserRole] = useState(groupRoles[0].roleName)
  const [confirmModalShouldShow, setConfirmModalShouldShow] = useState(false)

  const showConfirmationModal = () => {
    setConfirmModalShouldShow(true)
  }

  const hideConfirmationModal = () => {
    setConfirmModalShouldShow(false)
  }

  const handleChange = (e) => {
    setCurrentUserRole(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log(`Make member id: ${memberId} role to ${currentUserRole}`)

    closeModal()
  }

  const handleReset = () => {
    setCurrentUserRole(groupRoles[0].roleName)
  }

  const handleKickMember = () => {
    handleRemoveMember()

    hideConfirmationModal()
    closeModal()
  }

  return (
    <>
      {confirmModalShouldShow && (
        <SpawnModal title="Confirm" closeModal={hideConfirmationModal}>
          <div className="confirm-modal">
            <span className="fw-bold fs-500">Are you sure?</span>
            <div className="confirm-modal__button-group">
              <Button onClick={handleKickMember}>Yes</Button>
              <Button onClick={hideConfirmationModal} secondary>
                No
              </Button>
            </div>
          </div>
        </SpawnModal>
      )}
      <div className="edit-user-role">
        <form className="edit-user-role__form">
          <div className="edit-user-role__input-container">
            <label htmlFor="edit-user-role">Set Role:</label>
            <select
              id="edit-user-role"
              value={currentUserRole}
              onChange={handleChange}
            >
              {groupRoles.map((role) => (
                <option key={role.id} value={role.roleName}>
                  {role.roleName}
                </option>
              ))}
            </select>
          </div>
          <div className="edit-user-role__input-container">
            <Button onClick={showConfirmationModal} type="button" secondary>
              <MdWarning />
              <span>Kick member</span>
            </Button>
          </div>
          <hr />
          <div className="edit-user-role__button-group">
            <Button onClick={handleSubmit}>Save</Button>
            <Button type="button" onClick={handleReset} secondary>
              Reset
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}
