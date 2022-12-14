import ErrorText from '../../components/Error/ErrorText'
import LoadingSpinner from '../../components/Loading/LoadingSpinner/LoadingSpinner'
import Avatar from '../../components/UI/Avatar/Avatar'
import { apiBasePath } from '../../data/config'
import { MdUpload } from 'react-icons/md'
import './profile-settings.scss'
import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'

export default function ProfileSettings() {
  const user = useOutletContext()

  if (userLoading) return <LoadingSpinner />
  if (userError) return <ErrorText />

  const [fileInput, setFileInput] = useState(null)
  const [firstName, setFirstName] = useState(user.currentUser.first_name)
  const [lastName, setLastName] = useState(user.currentUser.last_name)
  const [username, setUsername] = useState(user.currentUser.username)
  const [age, setAge] = useState(user.currentUser.age)
  const [gender, setGender] = useState(user.currentUser.gender)
  const [section, setSection] = useState(user.currentUser.section)
  const [address, setAddress] = useState(user.currentUser.address)

  const handleChange = (e) => {}

  return (
    <div className="profile-settings">
      <form>
        <div className="profile-settings__header">
          <div className="profile-settings__image">
            <Avatar
              src={`${apiBasePath}/pfp/${user.currentUser.profile_img}`}
              size={256}
            />
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
                accept="image/*"
                id="image"
              />
            </div>
          </div>
          <h1 className="text-primary-400">
            <input
              className="profile-settings-input"
              type="text"
              placeholder={`${firstName} ${lastName}`}
            />
          </h1>
          <span>
            <input
              className="profile-settings-input"
              type="text"
              placeholder={username}
            />
          </span>
        </div>
        <div className="profile-settings__info">
          <span>
            <input
              className="profile-settings-input"
              type="text"
              placeholder={`Age: ${age}`}
            />
          </span>
          <span>
            <input
              className="profile-settings-input"
              type="text"
              placeholder={`Gender: ${gender}`}
            />
          </span>
          <span>
            <input
              className="profile-settings-input"
              type="text"
              placeholder={`Section: ${section}`}
            />
          </span>
          <span>
            <input
              className="profile-settings-input"
              type="text"
              placeholder={`Address: ${address}`}
            />
          </span>
        </div>
      </form>
    </div>
  )
}
