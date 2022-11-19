import Avatar from '../UI/Avatar/Avatar'
import './memberlist.scss'

export default function MemberList({ chatMembers }) {
  // * Loop through members property keys
  // * then loop through its elements

  return (
    <div className="member-list">
      {Object.entries(chatMembers).map(
        ([memberType, memberTypeMembers], index) => (
          <div key={memberType} className="member-list-role-group">
            <div className="member-list-role-type">
              <span>{memberType}</span>
            </div>
            <div className="member-list-role-members">
              {memberTypeMembers.map((member) => (
                // TODO: Create an onclick and onhover event on every avatar
                <Avatar
                  key={member.id}
                  src={member.profilePicUrl}
                  alt={`${member.username}'s photo`}
                  size="24"
                />
              ))}
            </div>
          </div>
        )
      )}
    </div>
  )
}
