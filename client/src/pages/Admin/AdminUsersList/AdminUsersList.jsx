import { useState } from 'react'
import { MdSettings } from 'react-icons/md'
import Avatar from '../../../components/UI/Avatar/Avatar'
import { useUsersQuery } from '../../../graphql/hooks/graphql'
import './admin-users-list.scss'
import LoadingSpinner from '../../../components/Loading/LoadingSpinner/LoadingSpinner'
import ErrorText from '../../../components/Error/ErrorText'
import { apiBasePath } from '../../../data/config'

export default function AdminUsersList() {
  const [searchInput, setSearchInput] = useState('')

  const {
    data: users,
    loading: usersLoading,
    error: usersError,
  } = useUsersQuery()

  if (usersLoading) return <LoadingSpinner />
  if (usersError) return <ErrorText>Something Went Wrong</ErrorText>

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
          {users.users.map((user) => (
            <div
              key={user.id}
              className="admin-users-list__list-user control-panel__card"
            >
              <Avatar
                size={36}
                src={`${apiBasePath}/pfp/${user.profile_img}`}
              />
              <span>{user.id}</span>
              <span>{`${user.first_name} ${user.last_name}`}</span>
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
