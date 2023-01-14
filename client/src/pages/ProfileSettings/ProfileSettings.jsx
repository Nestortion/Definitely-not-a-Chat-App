import ErrorText from '../../components/Error/ErrorText'
import LoadingSpinner from '../../components/Loading/LoadingSpinner/LoadingSpinner'
import Avatar from '../../components/UI/Avatar/Avatar'
import { apiBasePath } from '../../data/config'
import { MdUpload } from 'react-icons/md'
import './profile-settings.scss'
import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import Button from '../../components/UI/Button/Button'

export default function ProfileSettings() {
  const user = useOutletContext()

  const initialState = {
    profileImage: `${apiBasePath}/pfp/${user.currentUser.profile_img}`,
    firstName: user.currentUser.first_name,
    lastName: user.currentUser.last_name,
    username: user.currentUser.username,
    age: user.currentUser.age,
    gender: user.currentUser.gender,
    section: user.currentUser.section,
    address: user.currentUser.address,
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
        profileImage: URL.createObjectURL(file),
      }))
    }
  }

  const handleReset = () => {
    setValues(initialState)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // ! Backend logic here
    console.log(values)
  }

  return (
    <div className="profile-settings">
      <form onSubmit={handleSubmit}>
        <div className="profile-settings__header">
          <div className="profile-settings__image">
            <Avatar src={values.profileImage} size={256} />
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
              className="profile-settings-input"
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
            <input
              className="profile-settings-input"
              type="text"
              name="gender"
              onChange={handleChange}
              id="gender"
              value={values.gender}
            />
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

        <div className="profile-settings__button-group">
          <Button>Save</Button>
          <Button onClick={handleReset} secondary>
            Reset
          </Button>
        </div>
      </form>
    </div>
  )
}
