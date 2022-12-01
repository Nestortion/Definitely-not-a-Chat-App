import './file-input.scss'
import { MdFileUpload } from 'react-icons/md'

export default function FileInput({ onChange, ...rest }) {
  return (
    <div className="file-input">
      <label htmlFor="file-upload" className="file-input__label">
        <MdFileUpload />
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
