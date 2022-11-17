export default function Input({ label, id, type, ...rest }) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} {...rest} />
    </div>
  )
}
