import './reports.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useReportsQuery } from '../../../graphql/hooks/graphql'
import LoadingSpinner from '../../../components/Loading/LoadingSpinner/LoadingSpinner'
import ErrorText from '../../../components/Error/ErrorText'
import { useRef } from 'react'
import Avatar from '../../../components/UI/Avatar/Avatar'

const dummyHasThreatChats = [
  {
    id: 1,
    groupName: 'Super idol',
    groupProfileUrl: 'http://localhost:4000/grouppfp/default-icon.png',
  },

  {
    id: 2,
    groupName: 'Xue hua piao piao',
    groupProfileUrl: 'http://localhost:4000/grouppfp/default-icon.png',
  },
  {
    id: 3,
    groupName: 'Ching cheng hani',
    groupProfileUrl: 'http://localhost:4000/grouppfp/default-icon.png',
  },
]

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

        <div className="reports-table-container-wrapper">
          <div className="reports-potential-threats-container control-panel__card">
            <p className="fw-bold fs-500">Chats with potential threats</p>

            <div className="reports-potential-threats-list">
              {dummyHasThreatChats.map((groupChat) => (
                <Link
                  style={{
                    textDecoration: 'none',
                    width: '100%',
                  }}
                  to={`/admin/groups/${groupChat.id}`}
                  key={groupChat.id}
                  className="reports-potential-threats"
                >
                  <Avatar src={groupChat.groupProfileUrl} size={24} />
                  <span>{groupChat.groupName}</span>
                </Link>
              ))}
            </div>
          </div>

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
    </div>
  )
}
