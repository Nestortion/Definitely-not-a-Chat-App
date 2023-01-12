import { useState } from 'react'
import './report-chat.scss'

const reportReasons = [
  {
    id: 1,
    reason: 'Sharing inappropriate things',
  },
  {
    id: 2,
    reason: 'Hate speech',
  },
  {
    id: 3,
    reason: 'Scam',
  },
  {
    id: 4,
    reason: 'Others',
  },
]

export default function ReportChat() {
  // TODO: FIX LOGIC
  const [selectedReasons, setSelectedReasons] = useState([])

  const handleChange = (reason) => {
    if (selectedReasons.includes(reason)) {
      setSelectedReasons(selectedReasons.filter((r) => r !== reason))
    }

    setSelectedReasons((prev) => [...prev, reason])
  }

  return (
    <div className="report-chat">
      <span className="fs-500 fw-bold">Let us know what's going on</span>
      <ul className="report-chat__reasons">
        {reportReasons.map((reason) => (
          <li key={reason.id}>
            <span>{reason.reason}</span>
            <input
              type="checkbox"
              onChange={() => handleChange(reason.reason)}
            />
          </li>
        ))}
      </ul>
      <input type="text" />
    </div>
  )
}
