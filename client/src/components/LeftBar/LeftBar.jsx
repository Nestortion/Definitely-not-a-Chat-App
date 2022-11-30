import './leftbar.scss'
import Button from '../UI/Button/Button'
import Input from '../UI/Input/Input'
import ChatList from '../ChatList/ChatList'
import { useState } from 'react'
// ! FETCH HERE
// fetch all the group where the user is a member
import initialState from '../../data/chats.json'
import { useGroupsQuery } from '../../graphql/hooks/graphql'
import ErrorText from '../Error/ErrorText'
import LoadingText from '../Loading/LoadingText'

export default function LeftBar() {
  const { data: chat, loading, error } = useGroupsQuery()
  if (loading) return <LoadingText></LoadingText>
  if (error) return <ErrorText>Something went wrong</ErrorText>

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
