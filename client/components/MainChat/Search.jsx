import { AiFillPlusCircle } from 'react-icons/ai'
import { SearchStyled } from '../styles/MainChatStyled'

export default function Search() {
  return (
    <SearchStyled>
      <input type="text" placeholder="🔍Search" />
      <AiFillPlusCircle />
    </SearchStyled>
  )
}
