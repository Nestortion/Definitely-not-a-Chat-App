import './add-members.scss'
import Select from 'react-select'
import Button from '../../UI/Button/Button'
import { useState } from 'react'

// ! FETCH ALL MEMBERS
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
  { id: 32, value: 'Johfsddffn Doe 3', label: 'John Doe 3' },
  { id: 33, value: 'Necsddfstor 4', label: 'Nestor 4' },
  { id: 34, value: 'Josbeasdfl 4', label: 'Josel 4' },
  { id: 35, value: 'Josasdfel 2', label: 'Josel 2' },
  { id: 36, value: 'Jasasdfdasdff Doe 2', label: 'John Doe 2' },
  { id: 37, value: 'Nessadfxtor 3', label: 'Nestor 3' },
  { id: 38, value: 'Josefasdsfadbzcxl 3', label: 'Josel 3' },
  { id: 39, value: 'Johfasdfsdfn Doe 3', label: 'John Doe 3' },
  { id: 40, value: 'Necsasdfasdfstor 4', label: 'Nestor 4' },
  { id: 41, value: 'Josbasdfdasel 4', label: 'Josel 4' },
  { id: 42, value: 'Johasdnddffasz Doe 4', label: 'John Doe 4' },
  { id: 47, value: 'zxcvaassdfsdfdff', label: 'Nestor 2' },
  { id: 48, value: 'Joseaadfsdfsdfasfsdfdfl 2', label: 'Josel 2' },
  { id: 49, value: 'Jasdfaasdffa Doe 2', label: 'John Doe 2' },
  { id: 50, value: 'Nessdfxtasdssdfor 3', label: 'Nestor 3' },
  { id: 51, value: 'Joseasfasdfassdbzcxl 3', label: 'Josel 3' },
  { id: 52, value: 'Johfdfaasdfsddadfsffn Doe 3', label: 'John Doe 3' },
  { id: 53, value: 'Necsasdfddfstor s4', label: 'Nestor 4' },
  { id: 54, value: 'Josbsdfeasdfl 4', label: 'Josel 4' },
  { id: 55, value: 'Johadfsasdfasdnz Doe 4', label: 'John Doe 4' },
  { id: 36, value: 'Jasasddsfdasdff Doe 2', label: 'John Doe 2' },
  { id: 37, value: 'Nessadfsfxtor 3', label: 'Nestor 3' },
  { id: 38, value: 'Josefasdfdsdbzcxl 3', label: 'Josel 3' },
  { id: 39, value: 'Johfasdfsdfsdfn Doe 3', label: 'John Doe 3' },
  { id: 40, value: 'Nsecsasdfstor 4', label: 'Nestor 4' },
  { id: 41, value: 'Jofdsbasdfdasel 4', label: 'Josel 4' },
  { id: 42, value: 'Johdfsnddffasz Doe 4', label: 'John Doe 4' },
  { id: 47, value: 'zxcvsdfaassdfdff', label: 'Nestor 2' },
  { id: 48, value: 'Joseaassdfsdfdfl 2', label: 'Josel 2' },
  { id: 49, value: 'Jasdfaadsfsdff Doe 2', label: 'John Doe 2' },
  { id: 50, value: 'Nessdfxtafdsdsor 3', label: 'Nestor 3' },
  { id: 51, value: 'Joseasfasddfsfassdbzcxl 3', label: 'Josel 3' },
  { id: 52, value: 'Johfdfasddfsdfn Doe 3', label: 'John Doe 3' },
  { id: 53, value: 'Necsasdfddfstsdfor 4', label: 'Nestor 4' },
  { id: 54, value: 'Josbsdfeasdfl 4f', label: 'Josel 4' },
  { id: 55, value: 'Johsdfasdfnz Doe 4s', label: 'John Doe 4' },
]

export default function AddMembers() {
  const [selectedMembers, setSelectedMembers] = useState()

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: add members here
    console.log(selectedMembers)
    setSelectedMembers([])
  }

  const handleChange = (members) => {
    setSelectedMembers(members)
  }

  const handleReset = () => {
    setSelectedMembers([])
  }

  return (
    <div className="add-members">
      <form onSubmit={handleSubmit}>
        <div className="add-members__select">
          <Select
            value={selectedMembers}
            onChange={handleChange}
            options={members}
            isMulti
          />
        </div>
        <div className="add-members__button">
          <Button type="submit">Add</Button>
          <Button onClick={handleReset} secondary type="submit">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
