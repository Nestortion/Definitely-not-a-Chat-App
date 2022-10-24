import Image from 'next/image'
import { CardStyled } from './styles/UserGroupListStyled'

export default function Card({ pfp, size, title }) {
  return (
    <CardStyled>
      <div className="pfp">
        <Image src={pfp} height={size} width={size} />
      </div>
      {title}
    </CardStyled>
  )
}
