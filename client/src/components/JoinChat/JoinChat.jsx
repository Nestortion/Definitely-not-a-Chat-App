import { useState } from 'react'
import Button from '../UI/Button/Button'
import ReactSearchBox from 'react-search-box'
import './join-chat.scss'
import Input from '../UI/Input/Input'

const DUMMY_USERS = [
  { key: 1, value: 'Nestor', label: 'Nestor' },
  { key: 2, value: 'Josel', label: 'Josel' },
  { key: 3, value: 'John Doe', label: 'John Doe' },
]

export default function JoinChat() {
  const [joinChatId, setJoinChatId] = useState('')
  const [selectedMembers, setSelectedMembers] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const handleJoinChatIdChange = (e) => {
    setJoinChatId(e.target.value)
  }

  const handleJoin = () => {
    if (!joinChatId) return
    console.log(joinChatId)
  }

  const handleAddMember = (member) => {
    if (selectedMembers.includes(member)) return
    setSelectedMembers([...selectedMembers, member])
  }

  const handleRemoveMember = (memberToBeRemoved) => {
    console.log(memberToBeRemoved)
    setSelectedMembers(
      selectedMembers.filter((member) => member.key !== memberToBeRemoved.key)
    )
  }

  const handleCreate = () => {
    // Create chat with selected members
    if (selectedMembers.length === 0) return
    console.log(selectedMembers)
  }

  return (
    <div className="join-chat">
      <form onSubmit={handleSubmit}>
        <div className="join-chat__form__control">
          <span>Join a Conversation</span>
          <Input
            type="text"
            placeholder="Chat id"
            value={joinChatId}
            onChange={handleJoinChatIdChange}
          />
          <Button onClick={handleJoin}>Join</Button>
        </div>

        <div className="join-chat__form__control">
          <span>Create a Conversation</span>
          <ReactSearchBox
            placeholder="Search member"
            data={DUMMY_USERS}
            onSelect={(member) => handleAddMember(member.item)}
            clearOnSelect
            inputFontSize="0.8rem"
          />
          <div className="join-chat__selected-members">
            {selectedMembers.length > 0 && <h5>Selected Members: </h5>}
            <ul>
              {selectedMembers.map((member) => (
                <li key={member.key}>
                  <div className="join-chat__selected-member">
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
          <Button onClick={handleCreate}>Create</Button>
        </div>
      </form>
    </div>
  )
}
