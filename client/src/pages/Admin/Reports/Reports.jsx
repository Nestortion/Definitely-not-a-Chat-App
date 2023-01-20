import { useState } from 'react'
import './reports.scss'

export default function Reports() {
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

  const handleChange = (e, id) => {
    let setTo

    if (e.target.value === 'pending') {
      setTo = false
    } else {
      setTo = true
    }

    setReports((prev) =>
      prev.map((report) => {
        if (report.id === id) {
          return { ...report, resolved: setTo }
        }

        return report
      })
    )
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
                className={report.resolved ? 'resolved' : 'pending'}
              >
                <td>{report.id}</td>
                <td>{report.senderUserId}</td>
                <td>{report.reportedGroupId}</td>
                <td>{report.reportReasons.toString()}</td>
                <td>
                  <select
                    value={report.resolved ? 'resolved' : 'pending'}
                    onChange={(e) => handleChange(e, report.id)}
                  >
                    <option value="resolved">Resolved</option>
                    <option value="pending">Pending</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <div className="reports-entry">
          <span>Id</span>
          <span>Reported By</span>
          <span>Reported Group Id:</span>
          <span>Reasons</span>
          <span>Resolve status</span>
        </div>
        {reports.map((report) => (
          <div key={report.id} className="reports-entry">
            <span>{report.id}</span>
            <span>{report.senderUserId}</span>
            <span>{report.reportedGroupId}</span>
            <span>{report.reportReasons.toString()}</span>
            <span>{report.resolved ? 'Resolved' : 'Pending'}</span>
          </div>
        ))} */}
      </div>
    </div>
  )
}
