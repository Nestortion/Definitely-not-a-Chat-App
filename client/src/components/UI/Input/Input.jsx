import './input.scss'

export default function Input({ label, id, type, ...rest }) {
  return (
    <div className="input-container">
      {label && <label htmlFor={id}>{label}</label>}
      <input id={id} type={type} className="input-container__input" {...rest} />
    </div>
  )
}
