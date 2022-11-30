import Avatar from '../../UI/Avatar/Avatar'

export default function RoleMember({ member }) {
  // fetch member data here
  return (
    <div>
      <Avatar size={20} src={''} />
      <span>{member}</span>
    </div>
  )
}
