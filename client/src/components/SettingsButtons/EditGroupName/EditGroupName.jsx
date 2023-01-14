import { useState } from 'react'
import Button from '../../UI/Button/Button'
import './edit-group-name.scss'
import { useParams } from 'react-router-dom'
import { useUpdateGroupMutation } from '../../../graphql/hooks/graphql'
import { useRef } from 'react'
import { toast } from 'react-toastify'
import SpawnModal from '../../UI/Modal/SpawnModal'
import { MdWarning } from 'react-icons/md'

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

  const showConfirmModal = () => {
    setModalShouldShow(true)
  }

  const closeConfirmModal = () => {
    setModalShouldShow(false)
  }

  const handleDeleteGroup = () => {
    console.log('Group deleted')
  }

  return (
    <>
      {modalShouldShow && (
        <SpawnModal title="Confirm" closeModal={closeConfirmModal}>
          <div className="confirm-modal">
            <span className="fw-bold fs-500">Are you sure?</span>
            <div className="confirm-modal__button-group">
              <Button onClick={handleDeleteGroup}>Yes</Button>
              <Button onClick={closeConfirmModal} secondary>
                No
              </Button>
            </div>
          </div>
        </SpawnModal>
      )}
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
          <div className="edit-group-name__input">
            <Button onClick={showConfirmModal} secondary>
              <MdWarning style={{ display: 'inline-block' }} />
              <span>Delete Group</span>
            </Button>
          </div>

          <div className="edit-group-name__button-group">
            <Button onClick={handleSave}>Save</Button>
            <Button type="button" secondary onClick={handleReset}>
              Reset
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}
