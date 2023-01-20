import { useState } from 'react'
import Avatar from '../../../components/UI/Avatar/Avatar'
import './admin-control-panel.scss'
import { MdSettings } from 'react-icons/md'
import { Link } from 'react-router-dom'
import GroupList from '../../../components/GroupList/GroupList'

export default function AdminControlPanel() {
  const [totalUsers] = useState(42)
  const [totalGroupChats] = useState(125)
  const [pendingReports] = useState(0)

  const [topFourUsers] = useState([
    {
      id: 1,
      fullName: 'John Doe',
      profilePicUrl: 'http://localhost:4000/pfp/johndoe.jpg',
    },
    {
      id: 2,
      fullName: 'Jane Doe',
      profilePicUrl: 'http://localhost:4000/pfp/janedoe.jpg',
    },
    {
      id: 3,
      fullName: 'Josel Catalan',
      profilePicUrl: 'http://localhost:4000/pfp/josel.jpg',
    },
    {
      id: 4,
      fullName: 'Nestor Gerona',
      profilePicUrl: 'http://localhost:4000/pfp/nestor.jpg',
    },
  ])

  const [topFourGroupChats] = useState([
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

  return (
    <div className="control-panel">
      <div className="control-panel__top control-panel__card">
        <Link
          to="/admin/users"
          style={{ textDecoration: 'none', color: 'var(--clr-neutral-900)' }}
        >
          <div className="control-panel__card">
            <p className="control-panel__top-heading">Total Users</p>
            <p className="control-panel__top-number fw-bold">{totalUsers}</p>
          </div>
        </Link>

        <Link
          style={{ textDecoration: 'none', color: 'var(--clr-neutral-900)' }}
          to="/admin/groups"
        >
          <div className="control-panel__card">
            <p className="control-panel__top-heading">Total Group Chats</p>
            <p className="control-panel__top-number fw-bold">
              {totalGroupChats}
            </p>
          </div>
        </Link>

        <Link
          style={{ textDecoration: 'none', color: 'var(--clr-neutral-900)' }}
          to="/admin/reports"
        >
          <div className="control-panel__card">
            <p className="control-panel__top-heading">Pending Reports</p>
            <p className="control-panel__top-number fw-bold">
              {pendingReports}
            </p>
          </div>
        </Link>
      </div>

      <div className="control-panel__main">
        <div className="control-panel__card-container">
          <div className="control-panel__list-component control-panel__card">
            <p className="control-panel__list-heading fw-bold">Users List</p>
            <div className="control-panel__list-container">
              {topFourUsers.map((user) => (
                <div
                  key={user.id}
                  className="control-panel__list-user control-panel__card"
                >
                  <Avatar size={36} src={user.profilePicUrl} />
                  <span>{user.id}</span>
                  <span>{user.fullName}</span>
                  <span>
                    <MdSettings />
                  </span>
                </div>
              ))}
            </div>
            <Link to="/admin/users" className="control-panel__list-more">
              See more
            </Link>
          </div>

          <div className="control-panel__list-component control-panel__card">
            <p className="control-panel__list-heading fw-bold">
              Group Conversations List
            </p>
            <div className="control-panel__list-container">
              {topFourGroupChats.map((groupChat) => (
                <GroupList
                  key={groupChat.id}
                  id={groupChat.id}
                  groupName={groupChat.groupName}
                  profilePicUrl={groupChat.profilePicUrl}
                />
              ))}
            </div>
            <Link to="/admin/groups" className="control-panel__list-more">
              See more
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
