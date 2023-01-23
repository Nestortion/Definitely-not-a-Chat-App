import { useState } from 'react'
import './reports.scss'
import { useNavigate } from 'react-router-dom'

export default function Reports() {
  const navigate = useNavigate()

  const [reports, setReports] = useState([
    {
      id: 1,
      senderUserId: 1,
      reportedGroupId: 69,
      reportReasons: ['Sharing inappropriate things', 'Hate speech', 'Scam'],
      resolved: false,
    },
    {
      id: 2,
      senderUserId: 2,
      reportedGroupId: 69,
      reportReasons: ['This is the message on the others input'],
      resolved: false,
    },
    {
      id: 3,
      senderUserId: 1,
      reportedGroupId: 69,
      reportReasons: ['Sharing inappropriate things', 'Hate speech', 'Scam'],
      resolved: false,
    },
  ])

  const handleClick = (e, reportId) => {
    navigate(`/admin/reports/${reportId}`)
  }

  return (
    <div className="reports">
      <div className="reports-container">
        <p className="reports-heading fw-bold">Reports</p>
        <table className="reports-table control-panel__card">
          <thead>
            <tr className="fs-500">
              <th>Id</th>
              <th>Reported By</th>
              <th>Reported Chat Id</th>
              <th>Reasons</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr
                key={report.id}
                onClick={(e, id) => handleClick(e, report.id)}
              >
                <td>{report.id}</td>
                <td>{report.senderUserId}</td>
                <td>{report.reportedGroupId}</td>
                <td>{report.reportReasons.toString()}</td>
                <td>{report.resolved ? 'Resolved' : 'Pending'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
