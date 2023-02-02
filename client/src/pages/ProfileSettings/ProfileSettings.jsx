import ErrorText from '../../components/Error/ErrorText'
import LoadingSpinner from '../../components/Loading/LoadingSpinner/LoadingSpinner'
import Avatar from '../../components/UI/Avatar/Avatar'
import { apiBasePath } from '../../data/config'
import { MdSecurityUpdateWarning, MdUpload } from 'react-icons/md'
import './profile-settings.scss'
import { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import Button from '../../components/UI/Button/Button'
import {
  useSectionsQuery,
  useUpdateUserProfileMutation,
} from '../../graphql/hooks/graphql'
import SpawnModal from '../../components/UI/Modal/SpawnModal'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import PasswordStrengthBar from 'react-password-strength-bar'

export default function ProfileSettings() {
  const {
    data: sections,
    loading: sectionsLoading,
    error: sectionsError,
  } = useSectionsQuery()

  const warn = (text) =>
    toast(text, {
      position: toast.POSITION.TOP_CENTER,
      style: {
        color: 'var(--clr-neutral-100)',
        backgroundColor: 'var(--clr-error-400)',
        fontSize: 'clamp(0.8rem, 1.3vw, 1.5rem)',
      },
    })

  const [modalShouldShow, setModalShouldShow] = useState(false)
  const [shouldDisable, setShouldDisable] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('')
  const [modalConfirmPassword, setModalConfirmPassword] = useState('')
  const [passwordScore, setPasswordScore] = useState(0)

  const user = useOutletContext()
  const navigate = useNavigate()

  const [updateUserProfile] = useUpdateUserProfileMutation()

  const initialState = {
    profileLink: `${apiBasePath}/pfp/${user.currentUser.profile_img}`,
    firstName: user.currentUser.first_name,
    lastName: user.currentUser.last_name,
    username: user.currentUser.username,
    age: user.currentUser.age,
    birthdate: user.currentUser.birthdate,
    gender: user.currentUser.gender,
    section: user.currentUser.section.id,
    address: user.currentUser.address,
    profileImage: null,
  }

  const [values, setValues] = useState(initialState)

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

  const handlePasswordInputChange = (e) => {
    if (e.target.name === 'password') {
      setPasswordInput(e.target.value)
    } else {
      setConfirmPasswordInput(e.target.value)
    }
  }

  const handleModalConfirmPasswordChange = (e) => {
    setModalConfirmPassword(e.target.value)
  }

  const handleReset = () => {
    setValues(initialState)
  }

  const handleSubmit = async () => {
    if (values === initialState) return

    // ! Backend logic here
    const updateRes = await updateUserProfile({
      variables: {
        address: values.address,
        gender: values.gender,
        birthdate: values.birthdate,
        profileImg: values.profileImage,
        sectionId: parseInt(values.section),
        username: values.username,
        currentConfirmation: modalConfirmPassword,
        newPassword: confirmPasswordInput,
      },
    })

    if (updateRes.data.updateUserProfile === null) {
      warn('Wrong password')
    } else {
      navigate(0)
    }
  }

  const showConfirmModal = () => {
    setModalShouldShow(true)
  }

  const closeConfirmModal = () => {
    setModalShouldShow(false)
  }

  const handleChangeScore = (score, feedback) => {
    setPasswordScore(score)
  }

  useEffect(() => {
    if (
      !values.username ||
      values.username === '' ||
      !values.gender ||
      values.gender === '' ||
      !values.birthdate ||
      values.birthdate === '' ||
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
    const passwordNotGood = passwordScore <= 2

    if (
      hasPasswordButNoConfirmation ||
      hasConfirmationButNoPassword ||
      hasBothButIncorrect ||
      passwordNotGood
    ) {
      setShouldDisable(true)
    } else {
      setShouldDisable(false)
    }
  }, [passwordInput, confirmPasswordInput])

  if (sectionsLoading) return <LoadingSpinner />
  if (sectionsError) return <ErrorText>Something went Wrong</ErrorText>

  return (
    <>
      {modalShouldShow && (
        <SpawnModal title="Confirm" closeModal={closeConfirmModal}>
          <div className="confirm-modal">
            <div className="confirm-modal__input-container">
              <label htmlFor="modal-confirm">
                Enter your current password:
              </label>
              <input
                type="password"
                id="modal-confirm"
                value={modalConfirmPassword}
                onChange={handleModalConfirmPasswordChange}
              />
            </div>
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
                disabled
                className="profile-settings-input input-disable"
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
                className="profile-settings-input  input-disable"
                type="number"
                name="age"
                onChange={handleChange}
                id="age"
                value={values.age}
                disabled
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
              <select
                className="profile-settings-input"
                onChange={handleChange}
                value={values.section}
                type="text"
                id="section"
                name="section"
              >
                {sections.sections.map((section) => {
                  if (section.id === initialState.section)
                    return (
                      <option key={section.id} value={section.id}>
                        {section.section_name}
                      </option>
                    )
                  if (section.disabled) return
                  return (
                    <option key={section.id} value={section.id}>
                      {section.section_name}
                    </option>
                  )
                })}
              </select>
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
              <PasswordStrengthBar
                password={passwordInput}
                onChangeScore={handleChangeScore}
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
