import ChatCardStyled from '../styles/MainChatStyles/ChatCardStyled'
import Image from 'next/image'
import pfp from '../Assets/pfp.jpg'

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
