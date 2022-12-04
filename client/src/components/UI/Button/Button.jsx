import './button.scss'

export default function Button({ children, onClick, secondary, ...rest }) {
  return (
    <button
      className={`button ${secondary ? 'secondary-btn' : ''}`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  )
}
