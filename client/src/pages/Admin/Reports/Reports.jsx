import { useState } from 'react'
import './reports.scss'
import { useNavigate } from 'react-router-dom'
import { useReportsQuery } from '../../../graphql/hooks/graphql'
import LoadingSpinner from '../../../components/Loading/LoadingSpinner/LoadingSpinner'
import ErrorText from '../../../components/Error/ErrorText'

export default function Reports() {
  const navigate = useNavigate()

  const {
    data: reports,
    loading: reportsLoading,
    error: reportsError,
  } = useReportsQuery()

  if (reportsLoading) return <LoadingSpinner />
  if (reportsError) return <ErrorText>Something went wrong</ErrorText>

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
            {reports.reports.map((report) => (
              <tr
                key={report.id}
                onClick={(e, id) => handleClick(e, report.id)}
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
          <tbody>
            {reports.reports.map((report) => (
              <tr
                key={report.id}
                onClick={(e, id) => handleClick(e, report.id)}
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
  )
}
