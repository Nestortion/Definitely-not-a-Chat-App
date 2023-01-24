import LogEntry from '../../../components/LogEntry/LogEntry'
import './admin-logs.scss'
import { useAdminLogsQuery } from '../../../graphql/hooks/graphql'
import LoadingSpinner from '../../../components/Loading/LoadingSpinner/LoadingSpinner'
import ErrorText from '../../../components/Error/ErrorText'

export default function AdminLogs() {
  const {
    data: adminLogs,
    loading: adminLogsLoading,
    error: adminLogsError,
  } = useAdminLogsQuery()

  if (adminLogsLoading) return <LoadingSpinner />
  if (adminLogsError) return <ErrorText>Something weng wrong</ErrorText>

  return (
    <div className="admin-logs">
      <p className="admin-logs__heading fw-bold">Admin Logs</p>
      <div className="admin-logs-container control-panel__card">
        {adminLogs.adminLogs.map((log) => (
          <LogEntry
            key={log.id}
            createdAt={Intl.DateTimeFormat('en-US', {
              dateStyle: 'medium',
              timeStyle: 'short',
            }).format(new Date(log.createdAt))}
            actionDescription={log.action_description}
            fullName={`${log.full_name}`}
            userId={log.user_id}
          />
        ))}
      </div>
    </div>
  )
}
