import LogEntry from '../../../components/LogEntry/LogEntry'
import './user-logs.scss'
import LoadingSpinner from '../../../components/Loading/LoadingSpinner/LoadingSpinner'
import ErrorText from '../../../components/Error/ErrorText'
import { useUserLogsQuery } from '../../../graphql/hooks/graphql'
import InfiniteScroll from 'react-infinite-scroller'
import { useState } from 'react'

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

    if (userLogsLoading || userLogsError) {
    }
  }

  if (userLogsLoading) return <LoadingSpinner />
  if (userLogsError) return <ErrorText>Something went wrong</ErrorText>

  return (
    <div className="user-logs">
      <p className="user-logs__heading fw-bold">User Logs</p>
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
