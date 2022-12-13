import { useState } from 'react'
import './add-members.scss'

const allMembers = [
  {
    id: 1,
    first_name: 'Josel',
    last_name: 'Catalan',
  },
  {
    id: 2,
    first_name: 'Jane',
    last_name: 'Doe',
  },
  {
    id: 5,
    first_name: 'John',
    last_name: 'Doe',
  },
]

export default function AddMembers() {
  const [searchInput, setSearchInput] = useState('')
  const [selectedMembers, setSelectedMembers] = useState([
    {
      id: 1,
      first_name: 'Josel',
      last_name: 'Catalan',
    },
  ])

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value)
  }

  const handleAddMember = (member) => {
    setSelectedMembers([...selectedMembers, member])
  }

  const handleRemoveMember = (memberToBeRemoved) => {
    console.log('remove', memberToBeRemoved)
    setSelectedMembers(
      selectedMembers.filter((member) => member.id !== memberToBeRemoved.id)
    )
  }

  return (
    <div className="add-members">
      <div className="add-members__search">
        <form>
          <input
            type="text"
            placeholder="Search for a member"
            value={searchInput}
            onChange={handleSearchChange}
          />
        </form>
      </div>
      <div className="add-members__member-list">
        <h2>Selected Members: </h2>
        <ul>
          {selectedMembers.map((member) => (
            <li key={member.id}>
              <div className="add-members__member">
                <span>
                  {member.first_name} {member.last_name}
                </span>
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
    </div>
  )
}
