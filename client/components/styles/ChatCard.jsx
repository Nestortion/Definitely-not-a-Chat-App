import Image from 'next/image'
import { ChatCardStyled } from './MainChatStyled'

export default function ChatCard({ pfp, height, width }) {
  return (
    <ChatCardStyled>
      <div className="pfp">
        <Image src={pfp} height={height} width={width} />
      </div>
      Josel Catalan
    </ChatCardStyled>
  )
}
