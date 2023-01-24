import { useState } from 'react'
import './reports.scss'
import { useNavigate } from 'react-router-dom'
import { useReportsQuery } from '../../../graphql/hooks/graphql'
import LoadingSpinner from '../../../components/Loading/LoadingSpinner/LoadingSpinner'
import ErrorText from '../../../components/Error/ErrorText'
import { useRef } from 'react'
import { useEffect } from 'react'

const dummyReports = [
  {
    id: 1,
    user_id: 7,
    group_id: 150,
    report_reason: 'Sharing inappropriate things, Hate speech, ',
    user_id: 7,
    is_resolved: true,
  },
  {
    id: 2,
    user_id: 7,
    group_id: 150,
    report_reason: 'Sharing inappropriate things, Hate speech, ',
    user_id: 7,
    is_resolved: false,
  },
]

export default function Reports() {
  const navigate = useNavigate()
  const [resolvedReports, setResolvedReports] = useState([])
  const [pendingReports, setPendingReports] = useState([])
  const resolvedTbodyRef = useRef()
  const pendingTbodyRef = useRef()

  // const {
  //   data: reports,
  //   loading: reportsLoading,
  //   error: reportsError,
  // } = useReportsQuery()

  const handleClick = (e, reportId) => {
    navigate(`/admin/reports/${reportId}`)
  }

  useEffect(() => {
    dummyReports.forEach((report) => {
      if (report.is_resolved) {
        if (resolvedReports.includes(report)) return
        setResolvedReports([...resolvedReports, report])
      } else {
        if (pendingReports.includes(report)) return
        setPendingReports([...pendingReports, report])
      }
    })
  }, [dummyReports])

  // if (reportsLoading) return <LoadingSpinner />
  // if (reportsError) return <ErrorText>Something went wrong</ErrorText>

  return (
    <div className="reports">
      <div className="reports-container">
        <p className="reports-heading fw-bold">Reports</p>

        <div className="reports-table-container">
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
            <tbody ref={resolvedTbodyRef}>
              {pendingReports.map((report) => (
                <tr key={report.id} onClick={(e) => handleClick(e, report.id)}>
                  <td>{report.id}</td>
                  <td>{report.user_id}</td>
                  <td>{report.group_id}</td>
                  <td>{report.report_reason}</td>
                  <td>{report.is_resolved ? 'Resolved' : 'Pending'}</td>
                </tr>
              ))}
            </tbody>
          </table>

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
            <tbody ref={pendingTbodyRef}>
              {resolvedReports.map((report) => (
                <tr key={report.id} onClick={(e) => handleClick(e, report.id)}>
                  <td>{report.id}</td>
                  <td>{report.user_id}</td>
                  <td>{report.group_id}</td>
                  <td>{report.report_reason}</td>
                  <td>{report.is_resolved ? 'Resolved' : 'Pending'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
