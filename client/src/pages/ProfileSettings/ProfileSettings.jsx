import ErrorText from '../../components/Error/ErrorText'
import LoadingSpinner from '../../components/Loading/LoadingSpinner/LoadingSpinner'
import Avatar from '../../components/UI/Avatar/Avatar'
import { apiBasePath } from '../../data/config'
import { useUserQuery } from '../../graphql/hooks/graphql'
import { MdUpload } from 'react-icons/md'
import './profile-settings.scss'
import { useState } from 'react'

export default function ProfileSettings() {
  const { data: userData, userLoading, error: userError } = useUserQuery()

  if (userLoading) return <LoadingSpinner />
  if (userError) return <ErrorText />

  const [fileInput, setFileInput] = useState(null)
  const [firstName, setFirstName] = useState(userData.user.first_name)
  const [lastName, setLastName] = useState(userData.user.last_name)
  const [username, setUsername] = useState(userData.user.username)
  const [age, setAge] = useState(userData.user.age)
  const [gender, setGender] = useState(userData.user.gender)
  const [section, setSection] = useState(userData.user.section)
  const [address, setAddress] = useState(userData.user.address)

  const handleChange = (e) => {}

  return (
    <div className="profile-settings">
      <form>
        <div className="profile-settings__header">
          <div className="profile-settings__image">
            <Avatar
              src={`${apiBasePath}/pfp/${userData.user.profile_img}`}
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
