import Image from 'next/image'
import pfp from '../Assets/profile.svg'
import { UserHeaderStyled } from '../styles/MainChatStyled'

export default function UserHeader() {
  return (
    <UserHeaderStyled>
      <div className="pfp">
        <Image src={pfp} height={40} width={40} />
      </div>
      Josel Catalan
    </UserHeaderStyled>
  )
}
