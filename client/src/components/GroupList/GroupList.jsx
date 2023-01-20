import { useState } from 'react'
import { MdSettings } from 'react-icons/md'
import Avatar from '../UI/Avatar/Avatar'
import './group-list.scss'

export default function GroupList({ id, groupName, profilePicUrl }) {
  const groupMembers = [
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
  ]

  const [shouldShowMembers, setShouldShowMembers] = useState(false)

  const toggleShowMembers = () => {
    setShouldShowMembers((prev) => !prev)
  }

  return (
    <>
      <div
        className="group-list control-panel__card"
        onClick={toggleShowMembers}
      >
        <Avatar size={36} src={profilePicUrl} />
        <span>{id}</span>
        <span>{groupName}</span>
        <span>
          <MdSettings />
        </span>
      </div>
      {shouldShowMembers && (
        <div className="group-list__member-list control-panel__card">
          {groupMembers.map((member) => (
            <div
              key={member.id}
              className="group-list__member control-panel__card"
            >
              <span>{member.id}</span>
              <Avatar size={24} src={member.profilePicUrl} />
              <span>{member.fullName}</span>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
