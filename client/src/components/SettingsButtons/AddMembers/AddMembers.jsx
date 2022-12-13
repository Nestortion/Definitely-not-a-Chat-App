import { useState } from 'react'
import ReactSearchBox from 'react-search-box'
import Button from '../../UI/Button/Button'
import './add-members.scss'

// Transform the data like this first
// { key: id, value: 'first_name last_name'}
const allMembers = [
  {
    key: 1,
    value: 'Josel Catalan',
  },
  {
    key: 2,
    value: 'Jane Doe',
  },
  {
    key: 3,
    value: 'John Doe',
  },
  {
    key: 4,
    value: 'Nestor Gerona',
  },
  {
    key: 5,
    value: 'Nig Future',
  },
  {
    key: 6,
    value: 'Gaolang Wongsawat',
  },
  {
    key: 7,
    value: 'Tokita Ohma',
  },
  {
    key: 8,
    value: 'Kanoh Agito',
  },
  {
    key: 9,
    value: 'Kanoh Agito',
  },
  {
    key: 10,
    value: 'Among Amongus',
  },
]

export default function AddMembers() {
  // const [searchInput, setSearchInput] = useState('')
  const [selectedMembers, setSelectedMembers] = useState([])

  // const handleSearchChange = (e) => {
  //   setSearchInput(e.target.value)
  // }

  const handleAddMember = (member) => {
    // member's example value is {key: 1, value: 'JoseL Catalan'}

    // check if the member to be added is already selected
    if (selectedMembers.includes(member)) return

    setSelectedMembers([...selectedMembers, member])
  }

  const handleRemoveMember = (memberToBeRemoved) => {
    setSelectedMembers(
      selectedMembers.filter((member) => member.key !== memberToBeRemoved.key)
    )
  }

  const handleReset = () => {
    setSelectedMembers([])
  }

  const handleSave = () => {
    // add users to the group chat
    // the most important data is key
    // key correlates to id

    // check if there are no selected members
    if (selectedMembers.length === 0) return

    // do the logic here
    console.log(selectedMembers)

    // reset selectedMembers
    setSelectedMembers([])
  }

  return (
    <div className="add-members">
      <div className="add-members__search">
        {/* <input
            type="text"
            placeholder="Search for a member"
            value={searchInput}
            onChange={handleSearchChange}
          /> */}
        <ReactSearchBox
          placeholder="Search member"
          data={allMembers}
          onSelect={(member) => handleAddMember(member.item)}
          clearOnSelect
          inputFontSize="0.8rem"
          autoFocus
        />
      </div>
      <div className="add-members__member-list">
        {selectedMembers.length > 0 && <h3>Selected Members: </h3>}
        <ul>
          {selectedMembers.map((member) => (
            <li key={member.key}>
              <div className="add-members__member">
                <span>{member.value}</span>
                <input
                  type="checkbox"
                  defaultChecked
                  onClick={() => handleRemoveMember(member)}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="add-members__button-group">
        <Button onClick={handleSave}>Save</Button>
        <Button secondary onClick={handleReset}>
          Cancel
        </Button>
      </div>
    </div>
  )
}
