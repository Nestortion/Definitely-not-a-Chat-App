import { useState } from 'react'
import GroupList from '../../../components/GroupList/GroupList'
import './admin-groups-list.scss'

export default function AdminGroupsList() {
  const [searchInput, setSearchInput] = useState('')

  const [groupChats, setGroupChats] = useState([
    {
      id: 1,
      groupName: 'God Gamers',
      profilePicUrl: 'http://localhost:4000/grouppfp/default-icon.png',
    },
    {
      id: 2,
      groupName: 'lodinjanedoecluelul',
      profilePicUrl: 'http://localhost:4000/grouppfp/default-icon.png',
    },
    {
      id: 3,
      groupName: 'okay',
      profilePicUrl: 'http://localhost:4000/grouppfp/default-icon.png',
    },
    {
      id: 4,
      groupName: 'grz',
      profilePicUrl: 'http://localhost:4000/grouppfp/default-icon.png',
    },
  ])

  const handleChange = (e) => {
    setSearchInput(e.target.value)
  }

  return (
    <div className="admin-groups-list">
      <div className="admin-groups-list__component control-panel__card">
        <div className="admin-groups-list__top">
          <p className="admin-groups-list__list-heading fw-bold">Users List</p>
          <input
            type="text"
            className="admin-groups-list__list-search"
            placeholder="Search user"
            onChange={handleChange}
            value={searchInput}
          />
        </div>

        <div className="admin-groups-list__main">
          {groupChats.map((groupChat) => (
            <GroupList
              key={groupChat.id}
              id={groupChat.id}
              groupName={groupChat.groupName}
              profilePicUrl={groupChat.profilePicUrl}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
