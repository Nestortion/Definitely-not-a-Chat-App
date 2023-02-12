import LogEntry from '../../../components/LogEntry/LogEntry'
import './user-logs.scss'
import LoadingSpinner from '../../../components/Loading/LoadingSpinner/LoadingSpinner'
import ErrorText from '../../../components/Error/ErrorText'
import {
  useSectionsQuery,
  useUserLogsQuery,
} from '../../../graphql/hooks/graphql'
import InfiniteScroll from 'react-infinite-scroller'
import { useEffect, useState } from 'react'

export default function UserLogs() {
  const {
    data: userLogs,
    loading: userLogsLoading,
    error: userLogsError,
    fetchMore,
  } = useUserLogsQuery({ variables: { limit: 20, offset: 0 } })

  const {
    data: sections,
    loading: sectionsLoading,
    error: sectionsError,
  } = useSectionsQuery()

  const [logsPerSection, setLogsPerSection] = useState([])
  const [selectedSection, setSelectedSection] = useState('')

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
    setSelectedSection(e.target.value)
  }

  useEffect(() => {
    const filterLogs = userLogs?.userLogs.filter(
      (userlog) => userlog.section === selectedSection
    )
    setLogsPerSection(filterLogs)
  }, [userLogs, selectedSection])

  if (userLogsLoading) return <LoadingSpinner />
  if (userLogsError) return <ErrorText>Something went wrong</ErrorText>
  if (sectionsLoading) return <LoadingSpinner />
  if (sectionsError) return <ErrorText>Something went wrong</ErrorText>

  return (
    <div className="user-logs">
      <p className="user-logs__heading fw-bold">User Logs</p>
      <div className="user-logs__drop-down__container">
        <label className="fw-bold fs-500" htmlFor="filter-logs">
          Filter by section:{' '}
        </label>
        <select id="filter-logs" onChange={handleChange}>
          <option value={''}>{''}</option>
          {sections.sections.map((section) => (
            <option key={section.id} value={section.section_name}>
              {section.section_name}
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
          {selectedSection === ''
            ? userLogs.userLogs.map((log, index) => (
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
              ))
            : logsPerSection.map((log, index) => (
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
