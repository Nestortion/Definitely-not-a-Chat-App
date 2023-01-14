import { useState } from 'react'
import Button from '../../UI/Button/Button'
import './edit-group-name.scss'
import { useParams } from 'react-router-dom'
import { useUpdateGroupNameMutation } from '../../../graphql/hooks/graphql'
import { useRef } from 'react'
import { toast } from 'react-toastify'

export default function GroupSettings({ closeModal }) {
  const notify = () =>
    toast('Group Settings Saved!', {
      position: toast.POSITION.TOP_CENTER,
      style: {
        color: 'var(--clr-neutral-100)',
        backgroundColor: 'var(--clr-primary-400)',
        fontSize: 'clamp(0.8rem, 1.3vw, 1.5rem)',
      },
    })

  const [newName, setNewName] = useState('')
  const [newImage, setNewImage] = useState(null)
  const imageInputRef = useRef()
  const { chatId } = useParams()
  const [updateGroupName] = useUpdateGroupNameMutation()

  const handleChange = (e) => {
    setNewName(e.target.value)
  }

  const handleImageChange = ({
    target: {
      validity,
      files: [file],
    },
  }) => {
    if (validity.valid) {
      setNewImage(file)
    }
  }

  const handleSave = (e) => {
    e.preventDefault()

    if (!newName) return

    updateGroupName({
      variables: { groupName: newName, groupId: parseInt(chatId) },
    })

    closeModal()
    notify()
  }

  const handleReset = () => {
    setNewName('')
    setNewImage(null)
    imageInputRef.current.value = null
  }

  return (
    <div className="edit-group-name">
      <form onSubmit={handleSave}>
        <div className="edit-group-name__input">
          <label htmlFor="group-photo">New Group Photo</label>
          <input
            type="file"
            id="group-photo"
            accept="image/*"
            onChange={handleImageChange}
            ref={imageInputRef}
          />
        </div>
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
            Reset
          </Button>
        </div>
      </form>
    </div>
  )
}
