import './report.scss'
import { Link, useParams } from 'react-router-dom'
import NavBar from '../../../../components/NavBar/NavBar'
import Avatar from '../../../../components/UI/Avatar/Avatar'
import { useState } from 'react'

export default function Report() {
  const { reportId } = useParams()

  const reportDetails = {
    id: reportId,
    senderUserId: 1,
    reportedGroupId: 69,
    reportReasons: ['Sharing inappropriate things', 'Hate speech', 'Scam'],
    resolved: false,
  }

  const senderInfo = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    username: 'johndoe',
    profilePicUrl: 'http://localhost:4000/pfp/amogusz.jpg',
  }

  const reportedGroupInfo = {
    id: 69,
    groupName: 'Gamers',
    profilePicUrl: 'http://localhost:4000/grouppfp/default-icon.png',
  }

  const [currentStatus, setCurrentStatus] = useState(reportDetails.resolved)

  const handleChange = (e) => {
    setCurrentStatus(e.target.value)
  }

  return (
    <div className="report">
      <div className="report-box__container">
        <div className="report-box control-panel__card">
          <p className="report-box__heading fw-bold">Report Details</p>
          <div className="report-box__details">
            <p>
              <span className="fw-bold">Report Id: </span>
              <span>{reportDetails.id}</span>
            </p>
            <p>
              <span className="fw-bold">Reporter: </span>
              <span>{`${senderInfo.firstName} ${senderInfo.lastName}`}</span>
            </p>
            <p>
              <span className="fw-bold">Reportee: </span>
              <span>{reportedGroupInfo.groupName}</span>
            </p>
            <p>
              <span className="fw-bold">Reasons: </span>
              <span>
                {reportDetails.reportReasons.toString().replace(/,/g, ', ')}
              </span>
            </p>
            <p>
              <span className="fw-bold">Status: </span>
              <select value={currentStatus} onChange={handleChange}>
                <option value="true">Resolved</option>
                <option value="false">Pending</option>
              </select>
            </p>
          </div>
        </div>

        <Link
          to={`/profile/${senderInfo.id}`}
          style={{
            textDecoration: 'none',
            color: 'var(--clr-neutral-900)',
            display: 'block',
            width: '100%',
          }}
        >
          <div className="report-box control-panel__card">
            <p className="report-box__heading fw-bold">User Details</p>
            <div className="report-box__user-details report-box__details">
              <Avatar size={64} src={senderInfo.profilePicUrl} />
              <p>
                <span className="fw-bold">Id: </span>
                {senderInfo.id}
              </p>
              <p>
                <span className="fw-bold">Full name: </span>
                <span>{`${senderInfo.firstName} ${senderInfo.lastName}`}</span>
              </p>
              <p>
                <span className="fw-bold">Username: </span>
                {senderInfo.username}
              </p>
            </div>
          </div>
        </Link>

        <div className="report-box control-panel__card">
          <p className="report-box__heading fw-bold">Group Details</p>
          <div className="report-box__user-details report-box__details">
            <Avatar size={64} src={reportedGroupInfo.profilePicUrl} />
            <p>
              <span className="fw-bold">Group Id: </span>
              {reportedGroupInfo.id}
            </p>
            <p>
              <span className="fw-bold">Group Name: </span>
              {reportedGroupInfo.groupName}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
