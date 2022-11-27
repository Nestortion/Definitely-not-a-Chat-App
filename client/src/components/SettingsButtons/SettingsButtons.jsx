import './settings-buttons.scss'
import Button from '../UI/Button/Button'

export default function SettingsButtons() {
  return (
    <div className="settings-buttons">
      <Button>Add member</Button>
      <Button>Search in Group</Button>
      <Button>Report Chat</Button>
    </div>
  )
}
