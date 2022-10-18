import SearchStyled from '../styles/MainChatStyles/SearchStyled'
import { AiFillPlusCircle } from 'react-icons/ai'

export default function Search() {
  return (
    <SearchStyled>
      <input type="text" placeholder="🔍Search" />
      <AiFillPlusCircle />
    </SearchStyled>
  )
}
