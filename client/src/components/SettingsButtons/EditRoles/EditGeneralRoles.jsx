import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Button from '../../UI/Button/Button'
import './edit-general-roles.scss'

export default function EditGeneralRoles({ closeModal }) {
  const { id } = useParams()

  const initialState = [
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
    {
      id: 3,
      roleName: 'VIP',
      roleType: 'MODERATOR',
    },
    {
      id: 4,
      roleName: 'Worms',
      roleType: 'MEMBER',
    },
  ]

  const [groupRoles, setGroupRoles] = useState(initialState)
  const [newRole, setNewRole] = useState({
    id: 5,
    roleName: '',
    roleType: 'MEMBER',
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
    setGroupRoles((prev) => [...prev, newRole])
  }

  const handleDeleteRole = (id) => {
    console.log('Delete role with id:', id)
  }

  const handleSave = () => {
    console.log(groupRoles)
  }

  const handleReset = () => {
    setGroupRoles(initialState)
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
                value={role.roleName}
                name="roleName"
                onChange={(e) => handleChange(e, role.id)}
              />
            </div>
            <div className="group-role__permission">
              <label htmlFor="group-role-select">Role permission type:</label>
              <select
                id="group-role-select"
                value={role.roleType}
                name="roleType"
                onChange={(e) => handleChange(e, role.id)}
              >
                <option value="MEMBER">MEMBER</option>
                <option value="MODERATOR">MODERATOR</option>
              </select>
            </div>
            <div className="group-role__button-group">
              <Button onClick={() => handleDeleteRole(role.id)} secondary>
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
              name="roleName"
              value={newRole.roleName}
              onChange={handleNewRoleChange}
            />
          </div>
          <div className="group-role__permission">
            <label htmlFor="group-new-role-select">Role permission type:</label>
            <select
              id="group-new-role-select"
              name="roleType"
              value={newRole.roleType}
              onChange={handleNewRoleChange}
            >
              <option value="MEMBER">MEMBER</option>
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
