import { useState } from 'react'
import { MdDelete, MdEdit } from 'react-icons/md'
import Button from '../../components/UI/Button/Button'
import SpawnModal from '../../components/UI/Modal/SpawnModal'
import './maintenance.scss'

export default function Maintenance() {
  const sectionsSelection = [
    {
      id: 1,
      name: 'BSIT 1-1',
    },
    {
      id: 2,
      name: 'BSIT 2-1',
    },
    {
      id: 3,
      name: 'BSIT 3-1',
    },
    {
      id: 4,
      name: 'BSIT 4-1',
    },
    {
      id: 5,
      name: 'BSIT 5-1 BSIT 5-1BSIT 5-1BSIT 5-1BSIT 5-1BSIT 5-1BSIT 5-1BSIT 5-1BSIT 5-1',
    },
  ]

  const [modalShouldShow, setModalShouldShow] = useState(false)
  const [editModalShouldShow, setEditModalShouldShow] = useState(false)
  const [sections, setSections] = useState(sectionsSelection)
  const [input, setInput] = useState('')
  const [newSectionName, setNewSectionName] = useState('')
  const [currentSectionId, setCurrentSectionId] = useState()
  const [deleting, setDeleting] = useState(false)

  const showConfirmModal = () => {
    setModalShouldShow(true)
  }

  const closeConfirmModal = () => {
    setModalShouldShow(false)
    setDeleting(false)
  }

  const showEditModal = () => {
    setEditModalShouldShow(true)
  }

  const hideEditModal = () => {
    setEditModalShouldShow(false)
  }

  const handleChange = (e) => {
    setInput(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (modalShouldShow === true) return
    showConfirmModal()
  }

  const handleEdit = (sectionId) => {
    if (editModalShouldShow === true) return
    setCurrentSectionId(sectionId)
    showEditModal()
  }

  const handleDelete = (sectionId) => {
    setCurrentSectionId(sectionId)
    setDeleting(true)
    showConfirmModal()
  }

  const handleCreateSection = () => {
    if (!input) return

    // ! REPLACE THIS WITH THE BACKEND LOGIC
    setSections((prev) => [
      ...prev,
      { id: crypto.randomUUID().substring(0, 2), name: input },
    ])

    closeConfirmModal()
    setInput('')
  }

  const handleEditSection = () => {
    if (!newSectionName || !currentSectionId) return

    // ! ADD BACKEND LOGIC HERE
    console.log(currentSectionId)
    console.log(newSectionName)

    setCurrentSectionId(undefined)
    setNewSectionName('')
    hideEditModal()
  }

  const handleDeleteSection = () => {
    console.log(currentSectionId)

    // ! REPLACE THIS WITH THE BACKEND LOGIC
    setSections((prev) => {
      return prev.filter((section) => section.id !== currentSectionId)
    })

    setCurrentSectionId(undefined)
    setDeleting(false)
    closeConfirmModal()
  }

  return (
    <>
      {modalShouldShow && (
        <SpawnModal title="Confirm" closeModal={closeConfirmModal}>
          <div className="confirm-modal">
            <p className="fw-bold">Are you sure?</p>
            <div className="confirm-modal__button-group">
              {deleting ? (
                <Button onClick={handleDeleteSection}>Delete</Button>
              ) : (
                <Button onClick={handleCreateSection}>Yes</Button>
              )}

              <Button onClick={closeConfirmModal} secondary>
                No
              </Button>
            </div>
          </div>
        </SpawnModal>
      )}
      {editModalShouldShow && (
        <SpawnModal title="Edit Section" closeModal={hideEditModal}>
          <div className="confirm-modal">
            <div className="confirm-modal__input-container">
              <label htmlFor="modal-confirm">New Name:</label>
              <input
                type="text"
                id="modal-confirm"
                value={newSectionName}
                onChange={(e) => setNewSectionName(e.target.value)}
              />
            </div>
            <div className="confirm-modal__button-group">
              <Button onClick={handleEditSection}>Save</Button>
              <Button onClick={hideEditModal} secondary>
                Close
              </Button>
            </div>
          </div>
        </SpawnModal>
      )}
      <div className="maintenance">
        <p className="maintenance__heading fw-bold">Maintenance</p>

        <div className="maintenance__main">
          <div className="maintenance__input-container control-panel__card">
            <p className="maintenance__form-heading fw-bold fs-500">
              Create new Section
            </p>
            <form onSubmit={handleSubmit} className="maintenance__form">
              <input
                type="text"
                id="sectionName"
                placeholder="Section name"
                onChange={handleChange}
                value={input}
              />
              <Button>Save</Button>
            </form>
          </div>

          <div className="maintenance__section-container control-panel__card">
            <div className="maintenance__section control-panel__card">
              <span className="fw-bold">Id</span>
              <span className="fw-bold">Name</span>
            </div>
            {sections.map((section) => (
              <div
                key={section.id}
                className="maintenance__section control-panel__card"
              >
                <span>{section.id}</span>
                <span className="maintenance__name">{section.name}</span>
                <span
                  onClick={() => handleEdit(section.id)}
                  className="maintenance__action"
                >
                  <MdEdit title="Edit section" />
                </span>
                <span
                  onClick={() => handleDelete(section.id)}
                  className="maintenance__action"
                >
                  <MdDelete title="Delete section" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
