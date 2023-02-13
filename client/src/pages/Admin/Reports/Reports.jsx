import './reports.scss'
import { Link, useNavigate } from 'react-router-dom'
import {
  ChatThreatDetectedDocument,
  useReportsQuery,
} from '../../../graphql/hooks/graphql'
import LoadingSpinner from '../../../components/Loading/LoadingSpinner/LoadingSpinner'
import ErrorText from '../../../components/Error/ErrorText'
import { useEffect, useRef } from 'react'
import Avatar from '../../../components/UI/Avatar/Avatar'
import { apiBasePath } from '../../../data/config'

export default function Reports() {
  const navigate = useNavigate()
  const resolvedTbodyRef = useRef()
  const pendingTbodyRef = useRef()

  const {
    data: reportsFetch,
    loading: reportsFetchLoading,
    error: reportsFetchError,
    subscribeToMore,
  } = useReportsQuery()

  const handleClick = (e, reportId) => {
    navigate(`/admin/reports/${reportId}`)
  }

  useEffect(() => {
    subscribeToMore({
      document: ChatThreatDetectedDocument,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev

        const prevChatIds = prev.reports.chat_with_threat.map((chat) => chat.id)

        if (
          prevChatIds.includes(
            subscriptionData.data.chatThreatDetected.group.id
          )
        )
          return prev

        return {
          reports: {
            ...prev.reports,
            chat_with_threat: [
              ...prev.reports.chat_with_threat,
              subscriptionData.data.chatThreatDetected.group,
            ],
          },
        }
      },
    })
  }, [])

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
              {reportsFetch.reports.chat_with_threat.length === 0 ? (
                <div className="reports-potential-threats-none">
                  <p>No potential threats</p>
                </div>
              ) : null}
              {reportsFetch.reports.chat_with_threat.map((groupChat) => (
                <Link
                  style={{
                    textDecoration: 'none',
                    width: '100%',
                  }}
                  to={`/admin/groups/${groupChat.id}`}
                  key={groupChat.id}
                  className="reports-potential-threats"
                >
                  <span>{groupChat.id}</span>
                  <Avatar
                    src={`${apiBasePath}/grouppfp/${groupChat.group_picture}`}
                    size={24}
                  />
                  <span>{groupChat.group_name}</span>
                  <span>
                    {groupChat.is_group === 'true'
                      ? 'Group chat'
                      : 'Private chat'}
                  </span>
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
                {reportsFetch.reports.reports
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
                {reportsFetch.reports.reports
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
