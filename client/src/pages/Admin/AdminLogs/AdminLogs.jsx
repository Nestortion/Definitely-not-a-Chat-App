import LogEntry from '../../../components/LogEntry/LogEntry'
import './admin-logs.scss'
import { useAdminLogsQuery } from '../../../graphql/hooks/graphql'
import LoadingSpinner from '../../../components/Loading/LoadingSpinner/LoadingSpinner'
import ErrorText from '../../../components/Error/ErrorText'
import InfiniteScroll from 'react-infinite-scroller'
import { useState } from 'react'

export default function AdminLogs() {
  const {
    data: adminLogs,
    loading: adminLogsLoading,
    error: adminLogsError,
    fetchMore,
  } = useAdminLogsQuery({ variables: { limit: 20, offset: 0 } })

  const [hasMore, setHasMore] = useState(true)
  const loadMoreHandle = (page) => {
    fetchMore({
      variables: { limit: 10, offset: adminLogs.adminLogs.length },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return

        if (fetchMoreResult.adminLogs.length === 0) {
          setHasMore(false)
          return
        }

        return {
          adminLogs: prev.adminLogs.concat(fetchMoreResult.adminLogs),
        }
      },
    })
  }

  if (adminLogsLoading) return <LoadingSpinner />
  if (adminLogsError) return <ErrorText>Something weng wrong</ErrorText>

  return (
    <div className="admin-logs">
      <p className="admin-logs__heading fw-bold">Admin Logs</p>
      <div className="admin-logs-container control-panel__card">
        <InfiniteScroll
          pageStart={0}
          loadMore={loadMoreHandle}
          hasMore={hasMore}
          loader={<LoadingSpinner key={0} />}
          threshold={50}
        >
          {adminLogs.adminLogs.map((log, index) => (
            <LogEntry
              key={index}
              createdAt={Intl.DateTimeFormat('en-US', {
                dateStyle: 'medium',
                timeStyle: 'short',
              }).format(new Date(log.createdAt))}
              actionDescription={log.action_description}
              fullName={log.full_name}
              userId={log.user_id}
            />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  )
}
