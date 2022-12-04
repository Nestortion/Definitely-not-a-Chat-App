import './add-members.scss'
import Select from 'react-select'
import Button from '../../UI/Button/Button'

// ! FETCH ALL MEMBERS
const members = [
  { value: 'Nestor', label: 'Nestor' },
  { value: 'Josel', label: 'Josel' },
  { value: 'John Doe', label: 'John Doe' },
  { value: 'Nestor 2', label: 'Nestor 2' },
  { value: 'Josel 2', label: 'Josel 2' },
  { value: 'John Doe 2', label: 'John Doe 2' },
  { value: 'Nestor 3', label: 'Nestor 3' },
  { value: 'Josel 3', label: 'Josel 3' },
  { value: 'John Doe 3', label: 'John Doe 3' },
  { value: 'Nestor 4', label: 'Nestor 4' },
  { value: 'Josel 4', label: 'Josel 4' },
  { value: 'John Doe 4', label: 'John Doe 4' },
]

export default function AddMembers() {
  return (
    <div className="add-members">
      <form>
        <div className="add-members__select">
          <Select options={members} isMulti />
        </div>
        <div className="add-members__button">
          <Button>Add</Button>
          <Button>Cancel</Button>
        </div>
      </form>
    </div>
  )
}
