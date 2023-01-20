import { useState } from 'react'
import LogEntry from '../../../components/LogEntry/LogEntry'
import './admin-logs.scss'

export default function AdminLogs() {
  const [logs, setLogs] = useState([
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
  ])

  return (
    <div className="admin-logs">
      <p className="admin-logs__heading fw-bold">Admin Logs</p>
      <div className="admin-logs-container control-panel__card">
        {logs.map((log) => (
          <LogEntry
            key={log.id}
            createdAt={log.createdAt}
            actionDescription={log.actionDescription}
            fullName={log.fullName}
            userId={log.userId}
          />
        ))}
      </div>
    </div>
  )
}
