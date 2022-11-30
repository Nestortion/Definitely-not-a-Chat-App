import './error-text.scss'

export default function ErrorText({ children }) {
  return (
    <div className="error-text">
      <span className="text-error-400 fs-500">{children}</span>
    </div>
  )
}
