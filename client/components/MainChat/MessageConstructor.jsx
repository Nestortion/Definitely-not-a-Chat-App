import { AiFillPlusCircle } from 'react-icons/ai'
import { IoMdSend } from 'react-icons/io'
import { MessageConstructorStyled } from '../styles/MainChatStyled'

export default function MessageConstructor() {
  return (
    <MessageConstructorStyled>
      <AiFillPlusCircle />
      <input type="text" />
      <IoMdSend />
    </MessageConstructorStyled>
  )
}
