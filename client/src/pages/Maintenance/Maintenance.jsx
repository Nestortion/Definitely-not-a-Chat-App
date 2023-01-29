import { useEffect } from 'react'
import { useState } from 'react'
import { MdDelete, MdEdit, MdNotInterested } from 'react-icons/md'
import ErrorText from '../../components/Error/ErrorText'
import LoadingSpinner from '../../components/Loading/LoadingSpinner/LoadingSpinner'
import Button from '../../components/UI/Button/Button'
import SpawnModal from '../../components/UI/Modal/SpawnModal'
import {
  SectionsDocument,
  useCreateSectionMutation,
  useDeleteSectionMutation,
  useSectionsQuery,
  useUpdateSectionMutation,
} from '../../graphql/hooks/graphql'
import './maintenance.scss'

export default function Maintenance() {
  const [modalShouldShow, setModalShouldShow] = useState(false)
  const [editModalShouldShow, setEditModalShouldShow] = useState(false)
  const [input, setInput] = useState('')
  const [newSectionName, setNewSectionName] = useState('')
  const [currentSectionId, setCurrentSectionId] = useState()
  const [deleting, setDeleting] = useState(false)
  const [createSection] = useCreateSectionMutation()
  const [deleteSection] = useDeleteSectionMutation()
  const [updateSection] = useUpdateSectionMutation()
  const {
    data: sectionsFetch,
    loading: sectionsLoading,
    error: sectionsError,
  } = useSectionsQuery()

  if (sectionsLoading) return <LoadingSpinner />
  if (sectionsError) return <ErrorText>Something went wrong</ErrorText>

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

  const handleEnableSection = async (sectionId) => {
    // ! ADD BACKEND CODE

    console.log(sectionId)
  }

  const handleCreateSection = async () => {
    if (!input) return

    // ! REPLACE THIS WITH THE BACKEND LOGIC

    await createSection({
      variables: { sectionName: input },
      update(cache, { data: createSection }) {
        const { sections } = cache.readQuery({ query: SectionsDocument })

        cache.writeQuery({
          query: SectionsDocument,
          data: {
            sections: [...sections, createSection.createSection],
          },
        })
      },
    })

    closeConfirmModal()
    setInput('')
  }

  const handleEditSection = async () => {
    if (!newSectionName || !currentSectionId) return

    // ! ADD BACKEND LOGIC HERE

    await updateSection({
      variables: { sectionName: newSectionName, sectionId: currentSectionId },
    })

    setCurrentSectionId(undefined)
    setNewSectionName('')
    hideEditModal()
  }

  const handleDeleteSection = async () => {
    // ! REPLACE THIS WITH THE BACKEND LOGIC

    await deleteSection({
      variables: { sectionId: currentSectionId },
      update(cache, { data: deleteSection }) {
        const { sections } = cache.readQuery({ query: SectionsDocument })

        const updatedSection = sections.map((section) => {
          if (section.id === deleteSection.deleteSection.disabled) {
            return deleteSection.deleteSection
          }
          return section
        })

        cache.writeQuery({
          query: SectionsDocument,
          data: {
            sections: updatedSection,
          },
        })
      },
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
            {sectionsFetch.sections.map((section) => (
              <div
                key={section.id}
                className={`maintenance__section control-panel__card ${
                  section.disabled && 'disabled'
                }`}
              >
                <span>{section.id}</span>
                <span className="maintenance__name">
                  {section.section_name}
                </span>
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
                  <MdNotInterested title="Delete section" />
                </span>
                <span
                  onClick={() => handleEnableSection(section.id)}
                  className="maintenance__action"
                >
                  <Button>Enable</Button>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
