import './leftbar.scss'
import Button from '../UI/Button/Button'
import Input from '../UI/Input/Input'
import ChatList from '../ChatList/ChatList'
import { useState } from 'react'
// ! FETCH HERE
// fetch all the group where the user is a member
import initialState from '../../data/chats.json'
import { useGroupsQuery } from '../../graphql/hooks/graphql'

export default function LeftBar() {
  const [chats, setChats] = useState(initialState)
  const { data: chat, loading, error } = useGroupsQuery()
  if (loading) return <h1>loading</h1>
  if (error) return <h1>error</h1>

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
        <ChatList chats={chat.groups} />
      </div>
    </div>
  )
}
