import { useState } from 'react'
import Avatar from '../../../components/UI/Avatar/Avatar'
import './admin-control-panel.scss'
import { MdArrowForwardIos, MdSettings } from 'react-icons/md'
import { Link } from 'react-router-dom'
import GroupList from '../../../components/GroupList/GroupList'
import {
  useGroupListQuery,
  useSystemStatsQuery,
  useUsersQuery,
} from '../../../graphql/hooks/graphql'
import LoadingSpinner from '../../../components/Loading/LoadingSpinner/LoadingSpinner'
import ErrorText from '../../../components/Error/ErrorText'
import { apiBasePath } from '../../../data/config'

export default function AdminControlPanel() {
  const {
    data: systemStats,
    loading: systemStatsLoading,
    error: systemStatsError,
  } = useSystemStatsQuery()
  const [pendingReports] = useState(0)

  const {
    data: topFourUsers,
    loading: topFourUsersLoading,
    error: topFourUsersError,
  } = useUsersQuery({ variables: { limit: 4 } })

  const {
    data: topFourGroupChats,
    loading: topFourGroupChatsLoading,
    error: topFourGroupChatsError,
  } = useGroupListQuery({ variables: { limit: 4 } })

  const topFourUserLogs = [
    {
      id: 1,
      fullName: 'Nestor Gerona',
      section: 'BSIT 4-1',
      actionDescription: 'Added John Doe to clueluljohndoelodin',
      createdAt: '2023-01-02 11:14:48',
      userId: '1',
    },
    {
      id: 2,
      fullName: 'Nestor Gerona',
      section: 'BSIT 4-1',
      actionDescription: 'Has logged in',
      createdAt: '2023-01-02 11:13:48',
      userId: '1',
    },
    {
      id: 3,
      fullName: 'Nestor Gerona',
      section: 'BSIT 4-1',
      actionDescription: 'Has logged out',
      createdAt: '2023-01-02 11:12:48',
      userId: '1',
    },
    {
      id: 4,
      fullName: 'Nestor Gerona',
      section: 'BSIT 4-1',
      actionDescription: 'Has logged in',
      createdAt: '2023-01-02 11:11:48',
      userId: '1',
    },
  ]

  const topFourAdminLogs = [
    {
      id: 1,
      fullName: 'Nestor Gerona',
      actionDescription: 'The one piece IS REAL!',
      createdAt: '2023-01-02 11:14:48',
      userId: '1',
    },
    {
      id: 2,
      fullName: 'Nestor Gerona',
      actionDescription: 'The one piece IS REAL!',
      createdAt: '2023-01-02 11:13:48',
      userId: '1',
    },
    {
      id: 3,
      fullName: 'Nestor Gerona',
      actionDescription: 'The one piece IS REAL!',
      createdAt: '2023-01-02 11:12:48',
      userId: '1',
    },
    {
      id: 4,
      fullName: 'Nestor Gerona',
      actionDescription: 'The one piece IS REAL!',
      createdAt: '2023-01-02 11:12:48',
      userId: '1',
    },
  ]

  const latestUserLog = topFourUserLogs[0]
  const latesAdminLog = topFourAdminLogs[0]
  const latestUserAction = `${latestUserLog.fullName} ${latestUserLog.actionDescription}`
  const latestAdminAction = `${latesAdminLog.fullName} ${latesAdminLog.actionDescription}`

  if (topFourUsersLoading) return <LoadingSpinner />
  if (topFourUsersError) return <ErrorText>Something Went Wrong</ErrorText>
  if (systemStatsLoading) return <LoadingSpinner />
  if (systemStatsError) return <ErrorText>Something Went Wrong</ErrorText>
  if (topFourGroupChatsLoading) return <LoadingSpinner />
  if (topFourGroupChatsError) return <ErrorText>Something Went Wrong</ErrorText>

  return (
    <div className="control-panel">
      <div className="control-panel__top control-panel__card">
        <Link
          to="/admin/users"
          style={{ textDecoration: 'none', color: 'var(--clr-neutral-900)' }}
        >
          <div className="control-panel__card control-panel__top-card">
            <p className="control-panel__top-heading">Total Users</p>
            <p className="control-panel__top-number fw-bold">
              {systemStats.systemStats.userCount}
            </p>
          </div>
        </Link>

        <Link
          style={{ textDecoration: 'none', color: 'var(--clr-neutral-900)' }}
          to="/admin/groups"
        >
          <div className="control-panel__card control-panel__top-card">
            <p className="control-panel__top-heading">Total Group Chats</p>
            <p className="control-panel__top-number fw-bold">
              {systemStats.systemStats.groupCount}
            </p>
          </div>
        </Link>

        <Link
          style={{ textDecoration: 'none', color: 'var(--clr-neutral-900)' }}
          to="/admin/reports"
        >
          <div className="control-panel__card control-panel__top-card">
            <p className="control-panel__top-heading">Pending Reports</p>
            <p className="control-panel__top-number fw-bold">
              {pendingReports}
            </p>
          </div>
        </Link>

        <Link
          style={{ textDecoration: 'none', color: 'var(--clr-neutral-900)' }}
          to="/admin/admin-logs"
        >
          <div className="control-panel__card control-panel__top-card">
            <p className="control-panel__top-heading">Latest Admin Action</p>
            <p className="fs-300 fw-bold">{latestAdminAction}</p>
          </div>
        </Link>
      </div>

      <div className="control-panel__main">
        <div className="control-panel__card-container">
          <div className="control-panel__list-component control-panel__card">
            <p className="control-panel__list-heading fw-bold">Users List</p>
            <div className="control-panel__list-container">
              {topFourUsers.users.map((user) => (
                <div
                  key={user.id}
                  className="control-panel__list-user control-panel__card"
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
                      <MdArrowForwardIos />
                    </Link>
                  </span>
                </div>
              ))}
            </div>
            <Link to="/admin/users" className="control-panel__list-more">
              See more
            </Link>
          </div>

          <div className="control-panel__list-component control-panel__card">
            <p className="control-panel__list-heading fw-bold">Chat List</p>
            <div className="control-panel__list-container">
              {topFourGroupChats.groupList.map((groupChat) => (
                <GroupList
                  key={groupChat.id}
                  id={groupChat.id}
                  groupName={groupChat.group_name}
                  isGroup={groupChat.is_group}
                  profilePicUrl={groupChat.group_picture}
                />
              ))}
            </div>
            <Link to="/admin/groups" className="control-panel__list-more">
              See more
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
