import { useState, useRef } from 'react'
import Button from '../../UI/Button/Button'
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
  const refs = []

  const [selectedReasons, setSelectedReasons] = useState([])
  const [inputShouldShow, setInputShouldShow] = useState(false)
  const [otherReason, setOtherReason] = useState('')

  const handleChange = (reason) => {
    setInputShouldShow(refs[refs.length - 1].current.checked)

    if (selectedReasons.includes(reason)) {
      setSelectedReasons((prev) =>
        prev.filter((currentReason) => currentReason !== reason)
      )
    } else {
      setSelectedReasons((prev) => [...prev, reason])
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log(selectedReasons)
    console.log(otherReason)
  }

  return (
    <div className="report-chat">
      <span className="fs-500 fw-bold">Let us know what's going on</span>
      <ul className="report-chat__reasons">
        {reportReasons.map((reason) => {
          const newRef = useRef()
          refs.push(newRef)
          return (
            <li key={reason.id}>
              <span>{reason.reason}</span>
              <input
                type="checkbox"
                onChange={() => handleChange(reason.reason)}
                ref={newRef}
              />
            </li>
          )
        })}
      </ul>
      <form className="report-chat__form" onSubmit={handleSubmit}>
        <input
          className="report-chat__input"
          type="text"
          disabled={!inputShouldShow}
          onChange={(e) => setOtherReason(e.target.value)}
          value={otherReason}
        />
        <Button>Submit</Button>
      </form>
    </div>
  )
}
