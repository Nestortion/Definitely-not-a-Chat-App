import RoleMember from '../RoleMembers/RoleMember'

export default function Role({ type }) {
  // fetch member here base on role
  const members = ['profileUrl', 'thisShouldBeUrl', 'Luka Tim']

  return (
    <div>
      <h1>{type}</h1>
      {members.map((member) => (
        <RoleMember member={member} />
      ))}
    </div>
  )
}
