import { useState } from 'react'
import ReactSearchBox from 'react-search-box'
import Button from '../../UI/Button/Button'
import './add-members.scss'
import {
  useAddMemberListQuery,
  useAddMemberMutation,
} from '../../../graphql/hooks/graphql'
import ErrorText from '../../Error/ErrorText'
import LoadingSpinner from '../../Loading/LoadingSpinner/LoadingSpinner'
import { useParams } from 'react-router-dom'

// Transform the data like this first
// { key: id, value: 'first_name last_name'}

export default function AddMembers() {
  const { chatId } = useParams()
  const {
    data: allMembers,
    loading: usersLoading,
    error: usersError,
  } = useAddMemberListQuery({ variables: { groupId: parseInt(chatId) } })

  // const [searchInput, setSearchInput] = useState('')
  const [selectedMembers, setSelectedMembers] = useState([])
  const [addMembers] = useAddMemberMutation()
  if (usersLoading) return <LoadingSpinner />
  if (usersError) return <ErrorText>Error</ErrorText>

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

    const memberIds = selectedMembers.map((member) => member.key)
    addMembers({ variables: { groupId: parseInt(chatId), userId: memberIds } })
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
          data={allMembers.addMemberList}
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
