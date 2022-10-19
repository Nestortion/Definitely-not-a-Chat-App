import { BioStyled } from '../styles/AccountSettingsStyled'

export default function Bio() {
  return (
    <BioStyled>
      <textarea
        name="bio"
        id="bio"
        cols="30"
        rows="10"
        maxLength={255}
        placeholder="Add Bio"
      ></textarea>
    </BioStyled>
  )
}
