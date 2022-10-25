import { useEffect, useState } from 'react'
import pfp from './Assets/profile.svg'
import Card from './Card'
import { ListContainerStyled, ListStyled } from './styles/UserGroupListStyled'

export default function UserList({ title }) {
  const [users, setUsers] = useState([])

  useEffect(() => {
    for (let i = 0; i < 15; i++) {
      setUsers((users) => [...users, { pfp: pfp, size: '56px' }])
    }

    return () => {
      setUsers([])
    }
  }, [])

  return (
    <ListContainerStyled>
      <ListStyled>
        {users.map((user) => (
          <Card pfp={pfp} size={user.size} title={title} />
        ))}
      </ListStyled>
    </ListContainerStyled>
  )
}
