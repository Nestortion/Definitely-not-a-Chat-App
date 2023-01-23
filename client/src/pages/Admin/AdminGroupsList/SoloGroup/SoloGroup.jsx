import './solo-group.scss'
import { Link, useParams } from 'react-router-dom'
import Avatar from '../../../../components/UI/Avatar/Avatar'

export default function SoloGroup() {
  const { groupId } = useParams()

  const groupDetails = {
    id: groupId,
    groupName: 'lodinjanedoecluelul',
    groupPicUrl: 'http://localhost:4000/grouppfp/default-icon.png',
    isGroup: 1,
    roles: [
      {
        id: 1,
        roleName: 'Group Creator',
        roleType: 'MODERATOR',
        members: [
          {
            id: 1,
            profilePicUrl: 'http://localhost:4000/pfp/amogusz.jpg',
            firstName: 'Among',
            lastName: 'Us',
          },
        ],
      },
      {
        id: 2,
        roleName: 'Member',
        roleType: 'MEMBER',
        members: [
          {
            id: 2,
            profilePicUrl: 'http://localhost:4000/pfp/janedoe.jpg',
            firstName: 'Jane',
            lastName: 'Doe',
          },
          {
            id: 3,
            profilePicUrl: 'http://localhost:4000/pfp/johndoe.jpg',
            firstName: 'John',
            lastName: 'Doe',
          },
        ],
      },
    ],
  }

  return (
    <div className="solo-group">
      <div className="solo-group__container control-panel__card">
        <p className="solo-group__heading fw-bold">Group Details</p>

        <Avatar size={128} src={groupDetails.groupPicUrl} />

        <p className="solo-group__group-detail">
          <span>Group Id:</span>
          <span>{groupDetails.id}</span>
        </p>

        <p className="solo-group__group-detail">
          <span>Group Name:</span>
          <span>{groupDetails.groupName}</span>
        </p>

        <p className="solo-group__group-detail">
          <span>Group Type: </span>
          <span>{groupDetails.isGroup ? 'Group Chat' : 'Private Chat'}</span>
        </p>

        <p className="solo-group__group-detail">
          <span>Group Roles: </span>
        </p>
        {groupDetails.roles.map((role) => (
          <div
            className="solo-group__role-container control-panel__card"
            key={role.id}
          >
            <p className="solo-group__role-detail">
              <span className="fw-bold">{role.roleName}</span>
            </p>

            <p className="solo-group__role-detail">
              <span className="fs-400">{role.roleType}</span>
            </p>

            <div className="solo-group__role-member-container">
              {role.members.map((member) => (
                <Link
                  key={member.id}
                  to={`/profile/${member.id}`}
                  style={{
                    textDecoration: 'none',
                    color: 'var(--clr-neutral-900)',
                    display: 'block',
                    width: '100%',
                  }}
                >
                  <div className="solo-group__role-member hoverable control-panel__card">
                    <Avatar size={36} src={member.profilePicUrl} />
                    <p>{`${member.firstName} ${member.lastName}`}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
