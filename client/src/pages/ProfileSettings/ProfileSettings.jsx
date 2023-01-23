import ErrorText from '../../components/Error/ErrorText'
import LoadingSpinner from '../../components/Loading/LoadingSpinner/LoadingSpinner'
import Avatar from '../../components/UI/Avatar/Avatar'
import { apiBasePath } from '../../data/config'
import { MdUpload } from 'react-icons/md'
import './profile-settings.scss'
import { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import Button from '../../components/UI/Button/Button'
import { useUpdateUserProfileMutation } from '../../graphql/hooks/graphql'
import SpawnModal from '../../components/UI/Modal/SpawnModal'
import { useEffect } from 'react'

export default function ProfileSettings() {
  const [modalShouldShow, setModalShouldShow] = useState(false)
  const [shouldDisable, setShouldDisable] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('')

  const user = useOutletContext()
  const navigate = useNavigate()

  const [updateUserProfile] = useUpdateUserProfileMutation()

  const initialState = {
    profileLink: `${apiBasePath}/pfp/${user.currentUser.profile_img}`,
    firstName: user.currentUser.first_name,
    lastName: user.currentUser.last_name,
    username: user.currentUser.username,
    age: user.currentUser.age,
    gender: user.currentUser.gender,
    section: user.currentUser.section,
    address: user.currentUser.address,
    profileImage: null,
  }

  const [values, setValues] = useState(initialState)

  const handleChange = (e) => {
    //? the age automatically converts to string
    const { name, value } = e.target

    setValues({ ...values, [name]: value })
  }

  const handleImageChange = ({
    target: {
      validity,
      files: [file],
    },
  }) => {
    if (validity.valid) {
      setValues((prev) => ({
        ...prev,
        profileLink: URL.createObjectURL(file),
        profileImage: file,
      }))
    }
  }

  const handlePasswordInputChange = (e) => {
    if (e.target.name === 'password') {
      setPasswordInput(e.target.value)
    } else {
      setConfirmPasswordInput(e.target.value)
    }
  }

  const handleReset = () => {
    setValues(initialState)
  }

  const handleSubmit = async () => {
    // ! Backend logic here
    await updateUserProfile({
      variables: {
        address: values.address,
        age: parseInt(values.age),
        gender: values.gender,
        profileImg: values.profileImage,
        section: values.section,
        username: values.username,
        password: values.password,
      },
    })

    // ! add update passowrd here

    navigate(0)
  }

  const showConfirmModal = () => {
    setModalShouldShow(true)
  }

  const closeConfirmModal = () => {
    setModalShouldShow(false)
  }

  useEffect(() => {
    if (
      !values.username ||
      values.username === '' ||
      !values.age ||
      values.age === '' ||
      !values.gender ||
      values.gender === '' ||
      !values.section ||
      values.section === '' ||
      !values.address ||
      values.address === ''
    ) {
      setShouldDisable(true)
    } else {
      setShouldDisable(false)
    }
  }, [values])

  useEffect(() => {
    const hasPasswordButNoConfirmation = passwordInput && !confirmPasswordInput
    const hasConfirmationButNoPassword = !passwordInput && confirmPasswordInput
    const hasBothButIncorrect = passwordInput !== confirmPasswordInput

    if (
      hasPasswordButNoConfirmation ||
      hasConfirmationButNoPassword ||
      hasBothButIncorrect
    ) {
      setShouldDisable(true)
    } else {
      setShouldDisable(false)
    }
  }, [passwordInput, confirmPasswordInput])

  return (
    <>
      {modalShouldShow && (
        <SpawnModal title="Confirm" closeModal={closeConfirmModal}>
          <div className="confirm-modal">
            <span className="fw-bold fs-500">Are you sure?</span>
            <div className="confirm-modal__button-group">
              <Button onClick={handleSubmit}>Yes</Button>
              <Button onClick={closeConfirmModal} secondary>
                No
              </Button>
            </div>
          </div>
        </SpawnModal>
      )}
      <div className="profile-settings">
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
              <label htmlFor="firstName" className="text-primary-400">
                First name:
              </label>
              <input
                disabled
                className="profile-settings-input input-disable"
                type="text"
                name="firstName"
                onChange={handleChange}
                id="firstName"
                value={values.firstName}
              />
            </div>
            <div className="profile-settings__input-container">
              <label htmlFor="lastName" className="text-primary-400">
                Last name:
              </label>
              <input
                disabled
                className="profile-settings-input input-disable"
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
              <label htmlFor="age">Age: </label>
              <input
                className="profile-settings-input"
                type="number"
                name="age"
                onChange={handleChange}
                id="age"
                value={values.age}
              />
            </div>
            <div className="profile-settings__input-container">
              <label htmlFor="gender">Gender: </label>
              <select
                className="profile-settings-input"
                name="gender"
                onChange={handleChange}
                id="gender"
                value={values.gender}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div className="profile-settings__input-container">
              <label htmlFor="section">Section: </label>
              <input
                className="profile-settings-input"
                type="text"
                name="section"
                onChange={handleChange}
                id="section"
                value={values.section}
              />
            </div>
            <div className="profile-settings__input-container">
              <label htmlFor="address">Address: </label>
              <input
                className="profile-settings-input"
                type="text"
                name="address"
                onChange={handleChange}
                id="address"
                value={values.address}
              />
            </div>
          </div>

          <div className="profile-settings__password-group">
            <div className="profile-settings__input-container">
              <label htmlFor="password">Change password: </label>
              <input
                className="profile-settings-input"
                type="password"
                name="password"
                onChange={handlePasswordInputChange}
                id="password"
                value={passwordInput}
              />
            </div>
            <div className="profile-settings__input-container">
              <label htmlFor="confirm-password">Confirm password: </label>
              <input
                className="profile-settings-input"
                type="password"
                name="confirmPassword"
                onChange={handlePasswordInputChange}
                id="confirmPassword"
                value={confirmPasswordInput}
              />
            </div>
          </div>

          <div className="profile-settings__button-group">
            <Button
              is_default={shouldDisable}
              disabled={shouldDisable}
              type="button"
              onClick={showConfirmModal}
            >
              Save
            </Button>
            <Button type="button" onClick={handleReset} secondary>
              Reset
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}
