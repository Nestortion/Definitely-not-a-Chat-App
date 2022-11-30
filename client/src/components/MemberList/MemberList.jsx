import Role from '../Role/Role/Role'
import Avatar from '../UI/Avatar/Avatar'
import './memberlist.scss'

export default function MemberList({ chatMembers }) {
  // fetch roles here
  const roles = ['admin', 'human', 'prof']

  return (
    <div className="member-list">
      {roles.map((role) => (
        <Role type={role} />
      ))}
    </div>
  )
}
