import SettingsStyled from '../styles/MainChatStyles/SettingsStyled'

export default function Settings() {
  return (
    <SettingsStyled>
      <div className="header">Settings</div>
      <div className="settingsContainer">
        <div className="setting">Report Chat</div>
        <div className="setting">View History</div>
        <div className="setting">Add Member</div>
        <div className="setting">See All Members</div>
        <div className="setting">Search in Chat</div>
        <div className="setting">Mute Chat</div>
      </div>
    </SettingsStyled>
  )
}
