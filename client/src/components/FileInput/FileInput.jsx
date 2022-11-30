import './file-input.scss'

export default function FileInput({ onChange, ...rest }) {
  return (
    <div className="file-input">
      <label htmlFor="file-upload" className="file-input__label">
        +
      </label>
      <input
        type="file"
        onChange={onChange}
        id="file-upload"
        className="file-input__input"
        {...rest}
      />
    </div>
  )
}
