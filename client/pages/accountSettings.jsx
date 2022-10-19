import Bio from '../components/AccountSettings/Bio'
import DetailFields from '../components/AccountSettings/DetailFields'
import ProfilePicture from '../components/AccountSettings/ProfilePicture'
import { AccountSettingsStyled } from '../components/styles/AccountSettingsStyled'

export default function accountSettings() {
  return (
    <AccountSettingsStyled>
      <ProfilePicture />
      <Bio />
      <DetailFields />
    </AccountSettingsStyled>
  )
}
