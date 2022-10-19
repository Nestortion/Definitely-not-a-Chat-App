import Image from 'next/image'
import pfp from '../Assets/pfp.jpg'
import { ProfilePictureStyled } from '../styles/AccountSettingsStyled'

export default function ProfilePicture() {
  return (
    <ProfilePictureStyled>
      <Image src={pfp} height={500} width={500} />
      <button>Update Photo</button>
    </ProfilePictureStyled>
  )
}
