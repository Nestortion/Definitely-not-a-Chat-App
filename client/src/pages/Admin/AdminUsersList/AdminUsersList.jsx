import { useState } from 'react'
import { MdSettings } from 'react-icons/md'
import Avatar from '../../../components/UI/Avatar/Avatar'
import './admin-users-list.scss'

export default function AdminUsersList() {
  const [searchInput, setSearchInput] = useState('')

  const [users, setUsers] = useState([
    {
      id: 1,
      fullName: 'John Doe',
      profilePicUrl: 'http://localhost:4000/pfp/johndoe.jpg',
    },
    {
      id: 2,
      fullName: 'Jane Doe',
      profilePicUrl: 'http://localhost:4000/pfp/janedoe.jpg',
    },
    {
      id: 3,
      fullName: 'Josel Catalan',
      profilePicUrl: 'http://localhost:4000/pfp/josel.jpg',
    },
    {
      id: 4,
      fullName: 'Nestor Gerona',
      profilePicUrl: 'http://localhost:4000/pfp/nestor.jpg',
    },
  ])

  const handleChange = (e) => {
    setSearchInput(e.target.value)
  }

  return (
    <div className="admin-users-list">
      <div className="admin-users-list__component control-panel__card">
        <div className="admin-users-list__top">
          <p className="admin-users-list__list-heading fw-bold">Users List</p>
          <input
            type="text"
            className="admin-users-list__list-search"
            placeholder="Search user"
            onChange={handleChange}
            value={searchInput}
          />
        </div>
        <div className="admin-users-list__list-container">
          {users.map((user) => (
            <div
              key={user.id}
              className="admin-users-list__list-user control-panel__card"
            >
              <Avatar size={36} src={user.profilePicUrl} />
              <span>{user.id}</span>
              <span>{user.fullName}</span>
              <span>
                <MdSettings />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
