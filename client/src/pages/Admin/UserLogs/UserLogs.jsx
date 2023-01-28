import LogEntry from '../../../components/LogEntry/LogEntry'
import './user-logs.scss'
import LoadingSpinner from '../../../components/Loading/LoadingSpinner/LoadingSpinner'
import ErrorText from '../../../components/Error/ErrorText'
import { useUserLogsQuery } from '../../../graphql/hooks/graphql'
import Filter from 'bad-words'
import { array } from 'filipino-badwords-list'

export default function UserLogs() {
  const {
    data: userLogs,
    loading: userLogsLoading,
    error: userLogsError,
  } = useUserLogsQuery()

  const filter = new Filter({ list: array })

  if (userLogsLoading) return <LoadingSpinner />
  if (userLogsError) return <ErrorText>Something went wrong</ErrorText>

  return (
    <div className="user-logs">
      <p className="user-logs__heading fw-bold">User Logs</p>
      <div className="user-logs-container control-panel__card">
        {userLogs.userLogs.map((log) => (
          <LogEntry
            key={log.id}
            createdAt={Intl.DateTimeFormat('en-US', {
              dateStyle: 'medium',
              timeStyle: 'short',
            }).format(new Date(log.createdAt))}
            actionDescription={filter.clean(log.action_description)}
            fullName={log.full_name}
            section={log.section}
            userId={log.user_id}
          />
        ))}
      </div>
    </div>
  )
}
