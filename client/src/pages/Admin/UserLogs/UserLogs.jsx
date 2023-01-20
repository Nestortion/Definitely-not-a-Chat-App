import { useState } from 'react'
import LogEntry from '../../../components/LogEntry/LogEntry'
import './user-logs.scss'

export default function UserLogs() {
  const [logs, setLogs] = useState([
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
  ])

  return (
    <div className="user-logs">
      <p className="user-logs__heading fw-bold">User Logs</p>
      <div className="user-logs-container control-panel__card">
        {logs.map((log) => (
          <LogEntry
            key={log.id}
            createdAt={log.createdAt}
            actionDescription={log.actionDescription}
            fullName={log.fullName}
            section={log.section}
            userId={log.userId}
          />
        ))}
      </div>
    </div>
  )
}
