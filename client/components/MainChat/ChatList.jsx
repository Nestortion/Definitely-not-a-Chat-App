import { ChatListStyled } from '../styles/MainChatStyled'
import ChatCard from '../styles/ChatCard'
import pfp from '../Assets/pfp.jpg'
import { useEffect, useState } from 'react'

export default function ChatList() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    for (let i = 0; i < 15; i++) {
      setUsers((users) => [...users, { pfp: pfp, size: '56px' }])
    }

    return () => {
      setUsers([])
    }
  }, [])

  console.log(users)

  return (
    <ChatListStyled>
      {users.map((user) => (
        <ChatCard pfp={user.pfp} height={user.size} width={user.size} />
      ))}
    </ChatListStyled>
  )
}
