import './file-input.scss'

export default function FileInput() {
  return (
    <div className="file-input">
      <label htmlFor="file-upload" className="file-input__label">
        +
      </label>
      <input type="file" id="file-upload" className="file-input__input" />
    </div>
  )
}
