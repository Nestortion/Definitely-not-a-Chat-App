import './leftbar.scss'
import Button from '../UI/Button/Button'
import Input from '../UI/Input/Input'
import ChatList from '../ChatList/ChatList'
import { useState } from 'react'
import { useGroupsQuery } from '../../graphql/hooks/graphql'
import ErrorText from '../Error/ErrorText'
import LoadingSpinner from '../Loading/LoadingSpinner/LoadingSpinner'

export default function LeftBar({ showOnlyMiddle }) {
  const { data: chat, loading, error } = useGroupsQuery()
  if (loading) return <LoadingSpinner></LoadingSpinner>
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
        <ChatList chats={chat.groups} showOnlyMiddle={showOnlyMiddle} />
      </div>
    </div>
  )
}
