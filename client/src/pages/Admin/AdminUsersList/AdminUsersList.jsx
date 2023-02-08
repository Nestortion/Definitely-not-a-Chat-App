import { useEffect, useState } from 'react'
import { MdArrowForwardIos, MdSettings } from 'react-icons/md'
import Avatar from '../../../components/UI/Avatar/Avatar'
import { useUsersQuery } from '../../../graphql/hooks/graphql'
import './admin-users-list.scss'
import LoadingSpinner from '../../../components/Loading/LoadingSpinner/LoadingSpinner'
import ErrorText from '../../../components/Error/ErrorText'
import { apiBasePath } from '../../../data/config'
import { Link } from 'react-router-dom'
import useDebounceValue from '../../../helper_hooks/useDebounceValue'

export default function AdminUsersList() {
  const [searchInput, setSearchInput] = useState('')
  const [searchDataUser, setSearchDataUser] = useState([])
  const [searchDataAdmin, setSearchDataAdmin] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const debounceValue = useDebounceValue(searchInput, 250)

  const {
    data: users,
    loading: usersLoading,
    error: usersError,
  } = useUsersQuery()

  const usersList = users?.users.filter((user) => {
    return user.access_level === 'USER'
  })

  const adminsList = users?.users.filter((user) => {
    return user.access_level === 'ADMIN'
  })

  useEffect(() => {
    ;(() => {
      if (searchInput && searchInput.length > 0) {
        const filteredData = usersList.filter((user) => {
          const userFullName = `${user.first_name} ${user.last_name}`

          return userFullName
            .toLowerCase()
            .includes(debounceValue.toLowerCase())
        })

        setSearchDataUser(filteredData)
        setIsSearching(true)
      } else {
        setIsSearching(false)
      }
    })()
  }, [debounceValue])

  useEffect(() => {
    ;(() => {
      if (searchInput && searchInput.length > 0) {
        const filteredData = adminsList.filter((user) => {
          const userFullName = `${user.first_name} ${user.last_name}`

          return userFullName
            .toLowerCase()
            .includes(debounceValue.toLowerCase())
        })

        setSearchDataAdmin(filteredData)
        setIsSearching(true)
      } else {
        setIsSearching(false)
      }
    })()
  }, [debounceValue])

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

        <div className="admin-users-list__container-wrapper">
          <div className="admin-users-list__list-container">
            <p className="fw-bold fs-500">Users</p>
            {isSearching
              ? searchDataUser.map((user) => (
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
                      <Link
                        to={`/profile/${user.id}`}
                        style={{
                          textDecoration: 'none',
                          color: 'var(--clr-neutral-900)',
                          display: 'block',
                          width: '100%',
                        }}
                      >
                        <MdArrowForwardIos title="Go to profile page" />
                      </Link>
                    </span>
                  </div>
                ))
              : usersList.map((user) => (
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
                      <Link
                        to={`/profile/${user.id}`}
                        style={{
                          textDecoration: 'none',
                          color: 'var(--clr-neutral-900)',
                          display: 'block',
                          width: '100%',
                        }}
                      >
                        <MdArrowForwardIos title="Go to profile page" />
                      </Link>
                    </span>
                  </div>
                ))}
          </div>

          <div className="admin-users-list__list-container">
            <p className="fw-bold fs-500">Admins</p>

            {isSearching
              ? searchDataAdmin.map((user) => (
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
                      <Link
                        to={`/profile/${user.id}`}
                        style={{
                          textDecoration: 'none',
                          color: 'var(--clr-neutral-900)',
                          display: 'block',
                          width: '100%',
                        }}
                      >
                        <MdArrowForwardIos title="Go to profile page" />
                      </Link>
                    </span>
                  </div>
                ))
              : adminsList.map((user) => (
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
                      <Link
                        to={`/profile/${user.id}`}
                        style={{
                          textDecoration: 'none',
                          color: 'var(--clr-neutral-900)',
                          display: 'block',
                          width: '100%',
                        }}
                      >
                        <MdArrowForwardIos title="Go to profile page" />
                      </Link>
                    </span>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  )
}
