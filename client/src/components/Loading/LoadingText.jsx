import './loading-text.scss'

export default function LoadingText({ children }) {
  return (
    <div className="loading-text-container">
      {children && <span>{children}</span>}
      {!children && <span>Loading...</span>}
    </div>
  )
}
