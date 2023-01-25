import './button.scss'

export default function Button({
  is_default,
  children,
  onClick,
  secondary,
  green,
  ...rest
}) {
  return (
    <button
      className={`button ${secondary ? 'secondary-btn' : ''} ${
        is_default ? 'button-disabled' : ''
      } ${green ? 'green-btn' : ''}`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  )
}
