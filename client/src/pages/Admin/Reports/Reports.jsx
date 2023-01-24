import './reports.scss'
import { useNavigate } from 'react-router-dom'
import { useReportsQuery } from '../../../graphql/hooks/graphql'
import LoadingSpinner from '../../../components/Loading/LoadingSpinner/LoadingSpinner'
import ErrorText from '../../../components/Error/ErrorText'
import { useRef } from 'react'

export default function Reports() {
  const navigate = useNavigate()
  const resolvedTbodyRef = useRef()
  const pendingTbodyRef = useRef()

  const {
    data: reportsFetch,
    loading: reportsFetchLoading,
    error: reportsFetchError,
  } = useReportsQuery()

  const handleClick = (e, reportId) => {
    navigate(`/admin/reports/${reportId}`)
  }

  if (reportsFetchLoading) return <LoadingSpinner />
  if (reportsFetchError) return <ErrorText>Something went wrong</ErrorText>

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
              {reportsFetch.reports
                .filter((report) => report.is_resolved === false)
                .map((report) => (
                  <tr
                    key={report.id}
                    onClick={(e) => handleClick(e, report.id)}
                  >
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
              {reportsFetch.reports
                .filter((report) => report.is_resolved === true)
                .map((report) => (
                  <tr
                    key={report.id}
                    onClick={(e) => handleClick(e, report.id)}
                  >
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
