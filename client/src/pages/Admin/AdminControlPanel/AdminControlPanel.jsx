import { useEffect, useState } from 'react'
import Avatar from '../../../components/UI/Avatar/Avatar'
import './admin-control-panel.scss'
import { MdArrowForwardIos, MdSettings, MdWarning } from 'react-icons/md'
import { Link } from 'react-router-dom'
import GroupList from '../../../components/GroupList/GroupList'
import {
  ChatThreatDetectedDocument,
  useGraphDataQuery,
  useGroupListQuery,
  useSystemStatsQuery,
  useUsersQuery,
} from '../../../graphql/hooks/graphql'
import LoadingSpinner from '../../../components/Loading/LoadingSpinner/LoadingSpinner'
import ErrorText from '../../../components/Error/ErrorText'
import { apiBasePath } from '../../../data/config'
import { PieChart } from 'react-minimal-pie-chart'
import { useAtom } from 'jotai'
import { hasNotifStore } from '../../../store/notificationStore'
import { useOutletContext } from 'react-router-dom'

export default function AdminControlPanel() {
  const [hasNotif, setHasNotif] = useAtom(hasNotifStore)

  const { user } = useOutletContext()

  const {
    data: graphData,
    loading: graphDataLoading,
    error: graphDataError,
  } = useGraphDataQuery()

  const {
    data: systemStats,
    loading: systemStatsLoading,
    error: systemStatsError,
    subscribeToMore,
  } = useSystemStatsQuery()

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

  useEffect(() => {
    subscribeToMore({
      document: ChatThreatDetectedDocument,
      variables: { user: user.currentUser.id },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev

        return {
          systemStats: {
            ...prev.systemStats,
            pendingReportCount: prev.systemStats.pendingReportCount + 1,
          },
        }
      },
    })
  }, [])

  useEffect(() => {
    if (systemStats?.systemStats.pendingReportCount > 0) {
      setHasNotif(true)
    } else {
      setHasNotif(false)
    }
  }, [systemStats?.systemStats.pendingReportCount])

  if (graphDataLoading) return <LoadingSpinner />
  if (graphDataError) return <ErrorText>Something Went Wrong</ErrorText>
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
          <div
            className={`control-panel__card control-panel__top-card ${
              hasNotif && 'has-notif'
            }`}
          >
            <p className="control-panel__top-heading">
              Pending Reports/Threats
            </p>
            <p>{hasNotif && <MdWarning size={24} />}</p>
            <p className="control-panel__top-number fw-bold">
              {systemStats.systemStats.pendingReportCount}
            </p>
          </div>
        </Link>

        <Link
          style={{ textDecoration: 'none', color: 'var(--clr-neutral-900)' }}
          to="/admin/admin-logs"
        >
          <div className="control-panel__card control-panel__top-card">
            <p className="control-panel__top-heading">Latest Admin Action</p>
            <p className="fs-300 fw-bold">
              {systemStats.systemStats.latestAdminLog ? (
                <>
                  {Intl.DateTimeFormat('en-US', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  }).format(
                    new Date(systemStats.systemStats.latestAdminLog.createdAt)
                  )}
                  <br />
                  {`${systemStats.systemStats.latestAdminLog.full_name} ${systemStats.systemStats.latestAdminLog.action_description}`}
                </>
              ) : (
                'Admin Logs is currently empty'
              )}
            </p>
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
                      <MdArrowForwardIos title="Go to profile page" />
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

      <div className="control-panel__bottom">
        <div className="control-panel__chart-container control-panel__card">
          <p className="fw-bold fs-500">Section Percentages</p>
          <PieChart
            data={graphData.graphData}
            label={({ dataEntry }) =>
              `${dataEntry.title} = ${Math.round(dataEntry.percentage)} %`
            }
            labelStyle={(index) => ({
              fontSize: '0.3rem',
              fill: '#fff',
            })}
            segmentsShift={1}
            viewBoxSize={[110, 110]}
            center={[55, 55]}
            animate
          />
        </div>
      </div>
    </div>
  )
}
