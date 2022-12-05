import './edit-members.scss'
import Select from 'react-select'
import Button from '../../UI/Button/Button'
import { useState } from 'react'

// ! FETCH ALL MEMBERS
// ! value and id should be unique
const members = [
  { id: 1, value: 'Nestor', label: 'Nestor' },
  { id: 2, value: 'Josel', label: 'Josel' },
  { id: 3, value: 'John Doe', label: 'John Doe' },
  { id: 4, value: 'Nestor 2', label: 'Nestor 2' },
  { id: 5, value: 'Josel 2', label: 'Josel 2' },
  { id: 6, value: 'John Doe 2', label: 'John Doe 2' },
  { id: 7, value: 'Nestor 3', label: 'Nestor 3' },
  { id: 8, value: 'Josel 3', label: 'Josel 3' },
  { id: 9, value: 'John Doe 3', label: 'John Doe 3' },
  { id: 10, value: 'Nestor 4', label: 'Nestor 4' },
  { id: 11, value: 'Josel 4', label: 'Josel 4' },
  { id: 12, value: 'asdfasdf', label: 'John Doe 4' },
  { id: 13, value: 'asdf', label: 'John Doe' },
  { id: 14, value: 'zxcvf', label: 'Nestor 2' },
  { id: 15, value: 'Josel 2', label: 'Josel 2' },
  { id: 16, value: 'Jasdf Doe 2', label: 'John Doe 2' },
  { id: 17, value: 'Nesxtor 3', label: 'Nestor 3' },
  { id: 18, value: 'Josefsdbzcxl 3', label: 'Josel 3' },
  { id: 19, value: 'Johfsdfn Doe 3', label: 'John Doe 3' },
  { id: 20, value: 'Necsdstor 4', label: 'Nestor 4' },
  { id: 21, value: 'Josbdasel 4', label: 'Josel 4' },
  { id: 22, value: 'Johnz Doe 4', label: 'John Doe 4' },
  { id: 27, value: 'zxcvdff', label: 'Nestor 2' },
  { id: 28, value: 'Joseasdfl 2', label: 'Josel 2' },
  { id: 29, value: 'Jasdasdff Doe 2', label: 'John Doe 2' },
  { id: 30, value: 'Nesxtsor 3', label: 'Nestor 3' },
  { id: 31, value: 'Josefasdfassdbzcxl 3', label: 'Josel 3' },
]

export default function EditMembers() {
  // ! the default state are the members of the group

  // fetch members of the current group first and set as initial state
  const currentMembers = [
    { id: 54, value: 'Josbsdfeasdfl 4', label: 'Josel 4' },
    { id: 55, value: 'Johadfsasdfasdnz Doe 4', label: 'John Doe 4' },
    { id: 36, value: 'Jasasddsfdasdff Doe 2', label: 'John Doe 2' },
    { id: 37, value: 'Nessadfsfxtor 3', label: 'Nestor 3' },
    { id: 38, value: 'Josefasdfdsdbzcxl 3', label: 'Josel 3' },
    { id: 39, value: 'Johfasdfsdfsdfn Doe 3', label: 'John Doe 3' },
  ]

  // fetch all users (a little bit of trolling) to set as opstions

  // The submitted array should be all the edit done

  const [members, setMembers] = useState(currentMembers)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(members)
    setMembers(members)
  }

  const handleChange = (members) => {
    setMembers(members)
  }

  const handleReset = () => {
    setMembers(currentMembers)
  }

  return (
    <div className="edit-members">
      <form onSubmit={handleSubmit}>
        <div className="edit-members__select">
          <Select
            value={members}
            onChange={handleChange}
            options={members}
            isMulti
          />
        </div>
        <div className="edit-members__button">
          <Button type="submit">Save</Button>
          <Button onClick={handleReset} secondary type="button">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
