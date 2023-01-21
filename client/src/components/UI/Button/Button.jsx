import './button.scss'

export default function Button({
  is_default,
  children,
  onClick,
  secondary,
  ...rest
}) {
  return (
    <button
      className={`button ${secondary ? 'secondary-btn' : ''} ${
        is_default ? 'button-disabled' : ''
      }`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  )
}
