import { useState } from 'react'
import './log-entry.scss'

export default function LogEntry({
  createdAt,
  fullName,
  actionDescription,
  userId,
  section,
}) {
  const [detailShouldShow, setDetailShouldShow] = useState(false)

  const toggleDetails = () => {
    setDetailShouldShow((prev) => !prev)
  }

  return (
    <div className="log-entry">
      <p className="fw-bold">{createdAt}:</p>
      <div className="log-entry__detail">
        <span
          className="text-secondary-400 log-entry__name"
          onClick={toggleDetails}
        >
          {fullName}
        </span>
        <span className="text-primary-400">{actionDescription}</span>
      </div>

      {detailShouldShow && (
        <div className="log-entry__user-detail">
          <p>User Details:</p>
          <p>
            <span>Id: {userId}</span>
          </p>
          {section && (
            <p>
              <span>Section: {section}</span>
            </p>
          )}
        </div>
      )}
    </div>
  )
}
