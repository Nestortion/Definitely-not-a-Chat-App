import { useState } from 'react'
import Button from '../../UI/Button/Button'
import './edit-user-role.scss'
import { MdWarning } from 'react-icons/md'
import SpawnModal from '../../UI/Modal/SpawnModal'
import { useRef } from 'react'
import { useUpdateUserGroupRolesMutation } from '../../../graphql/hooks/graphql'
import { useParams } from 'react-router-dom'

export default function EditUserRole({
  userRoles,
  handleRemoveMember,
  closeModal,
  memberId,
  groupRoles,
}) {
  const { chatId } = useParams()
  const checkboxRefs = useRef([])
  const [confirmModalShouldShow, setConfirmModalShouldShow] = useState(false)
  const [updateUserGroupRoles] = useUpdateUserGroupRolesMutation()

  const showConfirmationModal = () => {
    setConfirmModalShouldShow(true)
  }

  const hideConfirmationModal = () => {
    setConfirmModalShouldShow(false)
  }

  const handleReset = () => {}

  const handleSubmit = async (e) => {
    e.preventDefault()
    let checkedCheckboxes = checkboxRefs.current.filter(
      (checkbox) => checkbox.checked
    )

    const rolesIds = checkedCheckboxes.map((value) => parseInt(value.id))

    checkedCheckboxes = checkedCheckboxes.map((value) => value.defaultValue)

    await updateUserGroupRoles({
      variables: {
        roles: checkedCheckboxes,
        groupId: parseInt(chatId),
        userId: memberId,
        rolesIds,
      },
    })

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
                <label htmlFor="">{role.role_name}</label>
                <input
                  id={role.id}
                  type="checkbox"
                  value={role.role_name}
                  defaultChecked={userRoles.includes(role.id)}
                  ref={(el) => checkboxRefs.current.push(el)}
                  disabled={role.is_default}
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
