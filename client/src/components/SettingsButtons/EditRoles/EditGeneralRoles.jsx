import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Button from '../../UI/Button/Button'
import './edit-general-roles.scss'
import { useUpdateGroupRolesMutation } from '../../../graphql/hooks/graphql'
import { toast } from 'react-toastify'

export default function EditGeneralRoles({ closeModal, rolesList }) {
  const notify = (text) =>
    toast(text, {
      position: toast.POSITION.TOP_CENTER,
      style: {
        color: 'var(--clr-neutral-100)',
        backgroundColor: 'var(--clr-primary-400)',
        fontSize: 'clamp(0.8rem, 1.3vw, 1.5rem)',
      },
    })

  const { chatId } = useParams()

  const [updateGroupRoles] = useUpdateGroupRolesMutation()

  const [groupRoles, setGroupRoles] = useState(rolesList)
  const [rolesToDel, setRolesToDel] = useState([])
  const [newRole, setNewRole] = useState({
    role_name: '',
    role_type: 'MEMBER',
  })

  const handleChange = (e, id) => {
    setGroupRoles((prev) =>
      prev.map((role) => {
        if (role.id === id) {
          return { ...role, [e.target.name]: e.target.value }
        }

        return role
      })
    )
  }

  const handleNewRoleChange = (e) => {
    setNewRole((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleAddRole = () => {
    if (!newRole.role_name) return

    if (groupRoles.some((role) => role.role_name === newRole.role_name)) return

    setGroupRoles((prev) => [
      ...prev,
      { ...newRole, id: null, emoji: '', description: '' },
    ])
  }

  const handleDeleteRole = (id) => {
    const roles = groupRoles.filter((role) => role.id === id)

    if (roles.some((role) => role.is_default === true)) return

    setGroupRoles(groupRoles.filter((role) => role.id !== id))
    setRolesToDel((prev) => [...prev, id])
  }

  const handleSave = () => {
    const filterGroupRoles = groupRoles.map((role) => {
      return {
        role_name: role.role_name,
        emoji: role.emoji,
        description: role.description,
        role_type: role.role_type,
        id: role.id,
      }
    })
    updateGroupRoles({
      variables: {
        rolesToEdit: filterGroupRoles,
        rolesToDelete: rolesToDel,
        groupId: parseInt(chatId),
      },
    })
    notify('GROUP ROLES UPDATED')
    closeModal()
  }

  const handleReset = () => {
    setGroupRoles(rolesList)
    setRolesToDel([])
  }

  return (
    <div className="general-role">
      <span className="fw-bold fs-500">Group roles</span>
      <div className="group-role__container">
        {groupRoles.map((role) => (
          <div key={role.id} className="group-role">
            <div className="group-role__name">
              <label htmlFor="group-role-input">Role Name:</label>
              <input
                type="text"
                id="group-role-input"
                className={`${role.is_default ? 'disable' : ''}`}
                disabled={role.is_default}
                value={role.role_name}
                name="role_name"
                onChange={(e) => handleChange(e, role.id)}
              />
            </div>
            <div className="group-role__permission">
              <label htmlFor="group-role-select">Role permission type:</label>
              <select
                id="group-role-select"
                value={role.role_type}
                name="role_type"
                className={`${role.is_default ? 'disable' : ''}`}
                disabled={role.is_default}
                onChange={(e) => handleChange(e, role.id)}
              >
                <option value="MEMBER">MEMBER</option>
                <option value="LEADER">LEADER</option>
                <option value="MODERATOR">MODERATOR</option>
              </select>
            </div>
            <div className="group-role__button-group ">
              <Button
                is_default={role.is_default}
                onClick={() => handleDeleteRole(role.id)}
                secondary
              >
                Delete Role
              </Button>
            </div>
          </div>
        ))}

        <hr />

        <div className="group-role">
          <div className="group-role__name">
            <label htmlFor="group-new-role-input">New Role</label>
            <input
              type="text"
              id="group-new-role-input"
              name="role_name"
              value={newRole.role_name}
              onChange={handleNewRoleChange}
            />
          </div>
          <div className="group-role__permission">
            <label htmlFor="group-new-role-select">Role permission type:</label>
            <select
              id="group-new-role-select"
              name="role_type"
              value={newRole.role_type}
              onChange={handleNewRoleChange}
            >
              <option value="MEMBER">MEMBER</option>
              <option value="LEADER">LEADER</option>
              <option value="MODERATOR">MODERATOR</option>
            </select>
          </div>
          <div className="group-role__button-group">
            <Button onClick={handleAddRole}>Add Role</Button>
          </div>
        </div>

        <hr />
      </div>
      <div className="group-role__button-group">
        <Button onClick={handleSave}>Save</Button>
        <Button onClick={handleReset} secondary>
          Reset
        </Button>
      </div>
    </div>
  )
}
