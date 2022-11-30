import './error.scss'

export default function Error({ children }) {
  return (
    <div className="error">
      <span className="text-error-400 fs-500">{children}</span>
    </div>
  )
}
