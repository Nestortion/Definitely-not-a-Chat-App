import { useState } from 'react'
import Button from '../../UI/Button/Button'
import './edit-group-name.scss'
import { useParams } from 'react-router-dom'
import { useUpdateGroupMutation } from '../../../graphql/hooks/graphql'
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
  const [modalShouldShow, setModalShouldShow] = useState(false)
  const imageInputRef = useRef()
  const { chatId } = useParams()
  const [updateGroup] = useUpdateGroupMutation()

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

    if (newName && newImage) {
      if (!newImage.type.includes('image') || newImage.type.includes('gif'))
        return
      updateGroup({
        variables: {
          groupName: newName,
          groupId: parseInt(chatId),
          groupPicture: newImage,
        },
      })
      closeModal()
      notify()
    } else if (newImage != null) {
      if (!newImage.type.includes('image') || newImage.type.includes('gif'))
        return
      updateGroup({
        variables: {
          groupId: parseInt(chatId),
          groupPicture: newImage,
        },
      })
      closeModal()
      notify()
    } else {
      if (newName !== '') {
        updateGroup({
          variables: { groupName: newName, groupId: parseInt(chatId) },
        })
        closeModal()
        notify()
      }
    }
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
          <label htmlFor="group-photo" className="fw-bold">
            New Group Photo
          </label>
          <input
            type="file"
            id="group-photo"
            accept="image/*"
            onChange={handleImageChange}
            ref={imageInputRef}
          />
        </div>
        <div className="edit-group-name__input">
          <label htmlFor="group-name" className="fw-bold">
            New Group Name
          </label>
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
