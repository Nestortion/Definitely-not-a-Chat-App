import { DetailFieldsStyled } from '../styles/AccountSettingsStyled'

export default function DetailFields() {
  return (
    <DetailFieldsStyled>
      <form>
        <div className="field">
          <label>User Name</label>
          <input type="text" />
        </div>
        <div className="field">
          <label>First Name </label>
          <input type="text" />
        </div>
        <div className="field">
          <label>Middle Name</label>
          <input type="text" />
        </div>
        <div className="field">
          <label>Last Name</label>
          <input type="text" />
        </div>
        <div className="field">
          <label>Password</label>
          <input type="password" />
        </div>
        <div className="field">
          <label>Address</label>
          <input type="text" />
        </div>
        <div className="field">
          <label>Contact</label>
          <input type="text" />
        </div>
        <div className="field">
          <label>Section</label>
          <input type="text" />
        </div>
        <button>Save Profile</button>
      </form>
    </DetailFieldsStyled>
  )
}
