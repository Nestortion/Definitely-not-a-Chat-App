import { useState } from 'react'
import Button from '../../UI/Button/Button'
import './edit-group-name.scss'
import { useParams } from 'react-router-dom'
import { useUpdateGroupNameMutation } from '../../../graphql/hooks/graphql'

export default function EditGroupName() {
  const [newName, setNewName] = useState('')
  const { chatId } = useParams()
  const [updateGroupName] = useUpdateGroupNameMutation()

  const handleChange = (e) => {
    setNewName(e.target.value)
  }

  const handleSave = (e) => {
    e.preventDefault()

    updateGroupName({
      variables: { groupName: newName, groupId: parseInt(chatId) },
    })
  }

  const handleReset = () => {
    setNewName('')
  }

  return (
    <div className="edit-group-name">
      <form onSubmit={handleSave}>
        <div className="edit-group-name__input">
          <label htmlFor="group-name">New Group Name</label>
          <input
            type="text"
            id="group-name"
            value={newName}
            onChange={handleChange}
          />
        </div>
        <div className="edit-group-name__button-group">
          <Button onClick={handleSave}>Save</Button>
          <Button type="button" secondary onClick={handleReset}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
