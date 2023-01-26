import { useState } from 'react'
import { MdUpload } from 'react-icons/md'
import Avatar from '../../../components/UI/Avatar/Avatar'
import Button from '../../../components/UI/Button/Button'
import './admin-profile-settings.scss'
import { toast } from 'react-toastify'
import SpawnModal from '../../../components/UI/Modal/SpawnModal'
import { apiBasePath } from '../../../data/config'
import { useAdminUpdateUserProfileMutation } from '../../../graphql/hooks/graphql'
import { useNavigate } from 'react-router-dom'

export default function AdminEditProfile({ closeModal, profileData }) {
  const navigate = useNavigate()
  const notify = (text, color) =>
    toast(text, {
      position: toast.POSITION.TOP_CENTER,
      style: {
        color: 'var(--clr-neutral--100)',
        backgroundColor: `${color}`,
        fontSize: 'clamp(0.8rem, 1.3vw, 1.5rem)',
      },
    })

  const initialState = {
    user_id: profileData.id,
    profileLink: `${apiBasePath}/pfp/${profileData.profile_img}`,
    firstName: profileData.first_name,
    lastName: profileData.last_name,
    username: profileData.username,
    password: '',
    birthdate: '',
    profileImage: null,
    accessLevel: profileData.acces_level,
  }

  const [values, setValues] = useState(initialState)
  const [confirmModalShouldShow, setConfirmModalShouldShow] = useState(false)
  const [updateUser] = useAdminUpdateUserProfileMutation()

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

  const handleSave = async () => {
    if (Object.values(values).some((prop) => prop === false)) return

    const updateRes = await updateUser({
      variables: {
        userData: {
          access_level: values.accessLevel,
          user_id: values.user_id,
          username: values.username,
          first_name: values.firstName,
          last_name: values.lastName,
          birthdate: values.birthdate,
          profile_img: values.profileImage,
          new_password: values.password,
        },
      },
    })

    hideConfirmModal()

    if (updateRes.data.adminUpdateUserProfile === null) {
      notify('Current User is not an Admin!', 'var(--clr-error-400)')
      return
    }

    navigate(0)
    // notify('User Profile Updated!', 'var(--clr-secondary-400)')
    // closeModal()
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

            <div className="profile-settings__input-container">
              <label htmlFor="birthdate">Birthdate: </label>
              <input
                className="profile-settings-input"
                type="date"
                name="birthdate"
                onChange={handleChange}
                id="birthdate"
                value={values.birthdate}
              />
            </div>

            <div className="profile-settings__input-container">
              <label htmlFor="accessLevel">Access Level: </label>
              <select
                className="profile-settings-input"
                onChange={handleChange}
                value={values.accessLevel}
                name="accessLevel"
                id="accessLevel"
              >
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </select>
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
