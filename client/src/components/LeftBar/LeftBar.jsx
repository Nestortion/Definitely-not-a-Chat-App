import './leftbar.scss'
import Button from '../UI/Button/Button'
import Input from '../UI/Input/Input'
import ChatList from '../ChatList/ChatList'
import { useState } from 'react'
// * Dummy data only
import initialState from '../../data/chats.json'

// TODO: create a fetch hook for fetching data

export default function LeftBar() {
  const [chats, setChats] = useState(initialState)

  return (
    <div className="leftbar">
      <div className="top">
        <div className="header">
          <h1>Chats</h1>
          <Button>+</Button>
        </div>
        <div className="search">
          <form>
            <Input type="text" placeholder="Search Chats" />
          </form>
        </div>
      </div>

      <div className="bottom">
        <ChatList chats={chats} />
      </div>
    </div>
  )
}
