import Image from 'next/image'
import pfp from '../Assets/pfp.jpg'
import { ChatCardStyled } from '../styles/MainChatStyled'

export default function ChatCard() {
  return (
    <ChatCardStyled>
      <div className="pfp">
        <Image src={pfp} height={56} width={56} />
      </div>
      Josel Catalan
    </ChatCardStyled>
  )
}
