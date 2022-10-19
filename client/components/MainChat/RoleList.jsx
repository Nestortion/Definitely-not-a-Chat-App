import { RoleListStyled } from '../styles/MainChatStyled'
import Role from './Role'

export default function RoleList() {
  return (
    <RoleListStyled>
      <div className="header">MEMBERS</div>
      <div className="Roles">
        <Role roleType="Amogus" color="red" />
        <Role roleType="Impostor" color="yellow" />
        <Role roleType="Sus" color="blue" />
      </div>
    </RoleListStyled>
  )
}
