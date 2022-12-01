import './settings-buttons.scss'
import Button from '../UI/Button/Button'
import { MdAdd, MdSearch, MdReport } from 'react-icons/md'

export default function SettingsButtons() {
  return (
    <div className="settings-buttons">
      <Button>
        <MdAdd style={{ display: 'inline-block' }} />
        <span>Add Members</span>
      </Button>
      <Button>
        <MdSearch style={{ display: 'inline-block' }} />
        <span>Search in Group</span>
      </Button>
      <Button>
        <MdReport style={{ display: 'inline-block' }} />
        <span>Report Chat</span>
      </Button>
    </div>
  )
}
