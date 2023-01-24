import './report.scss'
import { Link, useParams } from 'react-router-dom'
import Avatar from '../../../../components/UI/Avatar/Avatar'
import { useEffect, useState } from 'react'
import {
  ReportDocument,
  useReportQuery,
  useUpdateReportStatusMutation,
} from '../../../../graphql/hooks/graphql'
import LoadingSpinner from '../../../../components/Loading/LoadingSpinner/LoadingSpinner'
import ErrorText from '../../../../components/Error/ErrorText'
import { apiBasePath } from '../../../../data/config'
import Button from '../../../../components/UI/Button/Button'

export default function Report() {
  const { reportId } = useParams()

  const {
    data: report,
    loading: reportLoading,
    error: reportError,
  } = useReportQuery({ variables: { reportId: parseInt(reportId) } })

  const [currentStatus, setCurrentStatus] = useState(false)
  const [updateReportStatus] = useUpdateReportStatusMutation()

  useEffect(() => {
    setCurrentStatus(report?.report?.report.is_resolved)
  }, [report])

  if (reportLoading) return <LoadingSpinner />
  if (reportError) return <ErrorText>Something went wrong</ErrorText>

  const handleChange = (e) => {
    setCurrentStatus((prev) => !prev)
  }

  const handleSave = () => {
    updateReportStatus({
      variables: {
        reportId: parseInt(reportId),
        reportStatus: currentStatus,
      },
      update(cache, { data: { updateReportStatus } }) {
        const { report } = cache.readQuery({
          query: ReportDocument,
          variables: { reportId: parseInt(reportId) },
        })
        if (updateReportStatus === null) return

        cache.writeQuery({
          query: ReportDocument,
          variables: { reportId: parseInt(reportId) },
          data: {
            report: {
              report: updateReportStatus,
              sender: report.sender,
              chat_reported: report.chat_reported,
            },
          },
        })
      },
    })
  }

  const convertMessageDate = new Date(
    report.report.report.is_resolved
      ? report.report.report.date_resolved
      : report.report.report.createdAt
  )

  return (
    <div className="report">
      <div className="report-box__container">
        <div className="report-box control-panel__card">
          <p className="report-box__heading fw-bold">Report Details</p>
          <div className="report-box__details">
            <p>
              <span className="fw-bold">Report Id: </span>
              <span>{report.report.report.id}</span>
            </p>
            <p>
              <span className="fw-bold">Reporter: </span>
              <span>{`${report.report.sender.first_name} ${report.report.sender.last_name}`}</span>
            </p>
            <p>
              <span className="fw-bold">Reportee: </span>
              <span>{report.report.chat_reported.group_name}</span>
            </p>
            <p>
              <span className="fw-bold">Reasons: </span>
              <span>{report.report.report.report_reason}</span>
            </p>
            {report.report.report.is_resolved ? (
              <>
                <p>
                  <span className="fw-bold">Date Resolved: </span>
                  <span>
                    {Intl.DateTimeFormat('en-US', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    }).format(convertMessageDate)}
                  </span>
                </p>
              </>
            ) : (
              <p>
                <span className="fw-bold">Date Issued: </span>
                <span>
                  {Intl.DateTimeFormat('en-US', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  }).format(convertMessageDate)}
                </span>
              </p>
            )}

            <div className="report-box__status-container">
              <div>
                <span className="fw-bold">Status: </span>
                <select value={currentStatus} onChange={handleChange}>
                  <option value="true">Resolved</option>
                  <option value="false">Pending</option>
                </select>
              </div>
              <Button onClick={handleSave}>Save</Button>
            </div>
          </div>
        </div>

        <Link
          to={`/profile/${report.report.sender.id}`}
          style={{
            textDecoration: 'none',
            color: 'var(--clr-neutral-900)',
            display: 'block',
            width: '100%',
          }}
        >
          <div className="report-box hoverable  control-panel__card">
            <p className="report-box__heading fw-bold">User Details</p>
            <div className="report-box__user-details report-box__details">
              <Avatar
                size={64}
                src={`${apiBasePath}/pfp/${report.report.sender.profile_img}`}
              />
              <p>
                <span className="fw-bold">Id: </span>
                {report.report.sender.id}
              </p>
              <p>
                <span className="fw-bold">Full name: </span>
                <span>{`${report.report.sender.first_name} ${report.report.sender.last_name}`}</span>
              </p>
              <p>
                <span className="fw-bold">Username: </span>
                {report.report.sender.username}
              </p>
            </div>
          </div>
        </Link>

        <Link
          to={`/admin/groups/${report.report.chat_reported.id}`}
          style={{
            textDecoration: 'none',
            color: 'var(--clr-neutral-900)',
            display: 'block',
            width: '100%',
          }}
        >
          <div className="report-box hoverable  control-panel__card">
            <p className="report-box__heading fw-bold">Group Details</p>
            <div className="report-box__user-details report-box__details">
              <Avatar
                size={64}
                src={`${apiBasePath}/grouppfp/${
                  report.report.chat_reported.is_group === 'true'
                    ? report.report.chat_reported.group_picture
                    : 'default-icon.png'
                }`}
              />
              <p>
                <span className="fw-bold">Group Id: </span>
                {report.report.chat_reported.id}
              </p>
              <p>
                <span className="fw-bold">Group Name: </span>
                {report.report.chat_reported.group_name}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}
