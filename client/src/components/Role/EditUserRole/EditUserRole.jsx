import { useState } from 'react'
import Button from '../../UI/Button/Button'
import './edit-user-role.scss'
import { MdWarning } from 'react-icons/md'
import SpawnModal from '../../UI/Modal/SpawnModal'
import { useRef } from 'react'

export default function EditUserRole({
  handleRemoveMember,
  closeModal,
  memberId,
}) {
  const checkboxRefs = useRef([])
  const [confirmModalShouldShow, setConfirmModalShouldShow] = useState(false)

  const groupRoles = [
    {
      id: 1,
      roleName: 'Member',
      roleType: 'MEMBER',
      isDefault: true,
    },
    {
      id: 2,
      roleName: 'Group Creator',
      roleType: 'MODERATOR',
      isDefault: true,
    },
    {
      id: 3,
      roleName: 'Heheheha',
      roleType: 'MODERATOR',
      isDefault: false,
    },
    {
      id: 4,
      roleName: 'Gamer',
      roleType: 'MEMBER',
      isDefault: false,
    },
  ]

  const currentUserRoleInfo = {
    id: memberId,
    rolesInGroup: [1, 3],
  }

  const showConfirmationModal = () => {
    setConfirmModalShouldShow(true)
  }

  const hideConfirmationModal = () => {
    setConfirmModalShouldShow(false)
  }

  const handleReset = () => {}

  const handleSubmit = (e) => {
    e.preventDefault()
    const checkedCheckboxes = checkboxRefs.current.filter(
      (checkbox) => checkbox.checked
    )
    checkedCheckboxes.forEach((checkbox) => console.log(checkbox.value))
    closeModal()
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
            {groupRoles.map((role) => (
              <div key={role.id} className="edit-user-role__checkbox-container">
                <label htmlFor="">{role.roleName}</label>
                <input
                  type="checkbox"
                  value={role.roleName}
                  defaultChecked={currentUserRoleInfo.rolesInGroup.includes(
                    role.id
                  )}
                  ref={(el) => checkboxRefs.current.push(el)}
                  disabled={role.isDefault}
                />
              </div>
            ))}
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
