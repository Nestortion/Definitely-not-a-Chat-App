import RoleStyled from '../styles/MainChatStyles/RoleStyled'
import Image from 'next/image'
import pfp from '../Assets/pfp.jpg'

export default function Role({ roleType, color }) {
  return (
    <RoleStyled color={color}>
      <div className="roleTitle">{roleType}</div>
      <div className="memberList">
        <div className="member">
          <Image src={pfp} height={32} width={32} />
        </div>
        <div className="member">
          <Image src={pfp} height={32} width={32} />
        </div>
        <div className="member">
          <Image src={pfp} height={32} width={32} />
        </div>
        <div className="member">
          <Image src={pfp} height={32} width={32} />
        </div>
        <div className="member">
          <Image src={pfp} height={32} width={32} />
        </div>
        <div className="member">
          <Image src={pfp} height={32} width={32} />
        </div>
        <div className="member">
          <Image src={pfp} height={32} width={32} />
        </div>
        <div className="member">
          <Image src={pfp} height={32} width={32} />
        </div>
      </div>
    </RoleStyled>
  )
}
