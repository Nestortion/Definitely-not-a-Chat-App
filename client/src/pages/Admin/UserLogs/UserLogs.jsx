import LogEntry from '../../../components/LogEntry/LogEntry'
import './user-logs.scss'
import LoadingSpinner from '../../../components/Loading/LoadingSpinner/LoadingSpinner'
import ErrorText from '../../../components/Error/ErrorText'
import { useUserLogsQuery } from '../../../graphql/hooks/graphql'
import InfiniteScroll from 'react-infinite-scroller'
import { useState } from 'react'

const sections = [
  {
    id: 1,
    name: 'Not Set',
    disabled: 0,
  },
  {
    id: 2,
    name: 'BSIT 4-1',
    disabled: 0,
  },
  {
    id: 3,
    name: 'DICT 3-1',
    disabled: 1,
  },
]

export default function UserLogs() {
  const {
    data: userLogs,
    loading: userLogsLoading,
    error: userLogsError,
    fetchMore,
  } = useUserLogsQuery({ variables: { limit: 20, offset: 0 } })

  const [hasMore, setHasMore] = useState(true)
  const loadMoreHandle = (page) => {
    fetchMore({
      variables: { limit: 10, offset: userLogs.userLogs.length },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return

        if (fetchMoreResult.userLogs.length === 0) {
          setHasMore(false)
          return
        }

        return {
          userLogs: prev.userLogs.concat(fetchMoreResult.userLogs),
        }
      },
    })
  }

  const handleChange = (e) => {
    console.log(e.target.value)
  }

  if (userLogsLoading) return <LoadingSpinner />
  if (userLogsError) return <ErrorText>Something went wrong</ErrorText>

  return (
    <div className="user-logs">
      <p className="user-logs__heading fw-bold">User Logs</p>
      <div className="user-logs__drop-down__container">
        <label className="fw-bold fs-500" htmlFor="filter-logs">
          Filter by section:{' '}
        </label>
        <select id="filter-logs" onChange={handleChange}>
          {sections.map((section) => (
            <option key={section.id} value={section.name}>
              {section.name}
            </option>
          ))}
        </select>
      </div>
      <div className="user-logs-container control-panel__card">
        <InfiniteScroll
          pageStart={0}
          loadMore={loadMoreHandle}
          hasMore={hasMore}
          loader={<LoadingSpinner key={0} />}
          threshold={50}
        >
          {userLogs.userLogs.map((log, index) => (
            <LogEntry
              key={index}
              createdAt={Intl.DateTimeFormat('en-US', {
                dateStyle: 'medium',
                timeStyle: 'short',
              }).format(new Date(log.createdAt))}
              actionDescription={log.action_description}
              fullName={log.full_name}
              section={log.section}
              userId={log.user_id}
            />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  )
}
