import { useState } from 'react'
import { MdUpload } from 'react-icons/md'
import Avatar from '../../../components/UI/Avatar/Avatar'
import Button from '../../../components/UI/Button/Button'
import './admin-profile-settings.scss'
import { toast } from 'react-toastify'
import SpawnModal from '../../../components/UI/Modal/SpawnModal'

export default function AdminEditProfile({ closeModal, profileId }) {
  const notify = (text) =>
    toast(text, {
      position: toast.POSITION.TOP_CENTER,
      style: {
        color: 'var(--clr-neutral--100)',
        backgroundColor: 'var(--clr-error-400)',
        fontSize: 'clamp(0.8rem, 1.3vw, 1.5rem)',
      },
    })

  const initialState = {
    profileLink: '',
    firstName: '',
    lastName: '',
    username: '',
    age: '',
    gender: 'MALE',
    section: '',
    address: '',
    password: '',
    profileImage: null,
    accessLevel: 'MEMBER',
  }

  const [values, setValues] = useState(initialState)
  const [confirmModalShouldShow, setConfirmModalShouldShow] = useState(false)

  const handleChange = (e) => {
    //? the age automatically converts to string
    const { name, value } = e.target

    setValues({ ...values, [name]: value })
  }

  const handleImageChange = (e) => {
    const validity = e.target.validity
    const validFiles = ['image/jpeg', 'image/png']
    const uploadedFile = e.target.files[0]

    if (!validFiles.includes(uploadedFile.type)) return
    if (validity.valid) {
      setValues((prev) => ({
        ...prev,
        profileLink: URL.createObjectURL(uploadedFile),
        profileImage: uploadedFile,
      }))
    }
  }

  const handleSave = () => {
    if (Object.values(values).some((prop) => prop == false)) return

    console.log(`The current user id is : ${profileId}`)

    // if (success) {
    //   notify('User settings saved!')
    // } else {

    // }
  }

  const handleReset = () => {
    setValues(initialState)
  }

  const showConfirmModal = () => {
    setConfirmModalShouldShow(true)
  }

  const hideConfirmModal = () => {
    setConfirmModalShouldShow(false)
  }

  return (
    <>
      {confirmModalShouldShow && (
        <SpawnModal title="Confirm" closeModal={hideConfirmModal}>
          <div className="confirm-modal">
            <p className="fw-bold">Are you sure?</p>
            <div className="confirm-modal__button-group">
              <Button onClick={handleSave}>Yes</Button>
              <Button onClick={hideConfirmModal} secondary>
                No
              </Button>
            </div>
          </div>
        </SpawnModal>
      )}
      <div className="admin-profile">
        <form>
          <div className="profile-settings__header">
            <div className="profile-settings__image">
              <Avatar src={values.profileLink} size={256} />
              <div className="profile-settings__file-input">
                <label
                  className="profile-settings__file-input__label"
                  htmlFor="image"
                >
                  <MdUpload />
                </label>
                <input
                  className="profile-settings__file-input__input"
                  type="file"
                  accept="image/jpg, image/jpeg, image/png"
                  id="image"
                  onChange={handleImageChange}
                />
              </div>
            </div>
          </div>

          <div className="profile-settings__info">
            <div className="profile-settings__input-container">
              <label htmlFor="firstName">First name:</label>
              <input
                className="profile-settings-input"
                type="text"
                name="firstName"
                onChange={handleChange}
                id="firstName"
                value={values.firstName}
              />
            </div>
            <div className="profile-settings__input-container">
              <label htmlFor="lastName">Last name:</label>
              <input
                className="profile-settings-input"
                type="text"
                name="lastName"
                onChange={handleChange}
                id="lastName"
                value={values.lastName}
              />
            </div>
            <div className="profile-settings__input-container">
              <label htmlFor="username">Username: </label>
              <input
                className="profile-settings-input"
                type="text"
                name="username"
                onChange={handleChange}
                id="username"
                value={values.username}
              />
            </div>
            <div className="profile-settings__input-container">
              <label htmlFor="password">Change password: </label>
              <input
                className="profile-settings-input"
                type="password"
                name="password"
                onChange={handleChange}
                id="password"
                value={values.password}
              />
            </div>

            <div className="profile-settings__button-group">
              <Button type="button" onClick={showConfirmModal}>
                Save
              </Button>
              <Button type="button" secondary onClick={handleReset}>
                Reset
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
