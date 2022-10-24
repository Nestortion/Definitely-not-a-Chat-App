import Bio from '../components/AccountSettings/Bio'
import DetailFields from '../components/AccountSettings/DetailFields'
import ProfilePicture from '../components/AccountSettings/ProfilePicture'
import { AccountSettingsStyled } from '../components/styles/AccountSettingsStyled'
import Head from 'next/head'

export default function accountSettings() {
  return (
    <>
      <Head>
        <title>Account Settings | DNCA</title>
      </Head>
      <AccountSettingsStyled>
        <ProfilePicture />
        <Bio />
        <DetailFields />
      </AccountSettingsStyled>
    </>
  )
}
