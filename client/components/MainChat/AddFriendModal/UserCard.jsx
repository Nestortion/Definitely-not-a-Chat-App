import Image from 'next/image'
import { UserCardStyled } from '../../styles/MainChatStyled'
import pfp from '../../Assets/pfp.jpg'

export default function UserCard() {
  return (
    <UserCardStyled>
      <div className="img">
        <Image src={pfp} height={40} width={40} />
      </div>
      Josel Catalan
      <input type="checkbox" />
    </UserCardStyled>
  )
}
