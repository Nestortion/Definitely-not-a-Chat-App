import { ChatSettingsContainerStyled } from '../styles/MainChatStyled'
import RoleList from './RoleList'
import Settings from './Settings'

export default function ChatSettingsContainer() {
  return (
    <ChatSettingsContainerStyled>
      <RoleList />
      <Settings />
    </ChatSettingsContainerStyled>
  )
}
