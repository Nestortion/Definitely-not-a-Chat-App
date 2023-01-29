import { useState } from 'react'
import Button from '../../../components/UI/Button/Button'
import './register.scss'
import {
  useAddUserMutation,
  useSectionsQuery,
} from '../../../graphql/hooks/graphql'
import { toast } from 'react-toastify'
import LoadingSpinner from '../../../components/Loading/LoadingSpinner/LoadingSpinner'
import ErrorText from '../../../components/Error/ErrorText'

export default function Register() {
  const {
    data: sections,
    loading: sectionsLoading,
    error: sectionsError,
  } = useSectionsQuery()

  const notify = (text) =>
    toast(text, {
      position: toast.POSITION.TOP_CENTER,
      style: {
        color: 'var(--clr-neutral-100)',
        backgroundColor: 'var(--clr-primary-400)',
        fontSize: 'clamp(0.8rem, 1.3vw, 1.5rem)',
      },
    })

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    birthdate: '',
    gender: 'Male',
    section: '1',
    address: '',
    accessLevel: 'USER',
    password: '',
  })
  const [register] = useAddUserMutation()

  const handleChange = (e) => {
    const { name, value } = e.target

    setUserData({ ...userData, [name]: value })
  }

  const handleReset = () => {
    setUserData({
      firstName: '',
      lastName: '',
      username: '',
      birthdate: '',
      gender: 'Male',
      section: '',
      address: '',
      accessLevel: 'USER',
      password: '',
    })
  }

  const handleSubmit = async (e) => {
    // Check if there are falsy values (e.g. '' or null)
    if (Object.values(userData).some((el) => el === false)) return

    e.preventDefault()

    const registerRes = await register({
      variables: {
        userData: {
          access_level: userData.accessLevel,
          username: userData.username,
          first_name: userData.firstName,
          last_name: userData.lastName,
          birthdate: userData.birthdate,
          address: userData.address,
          section_id: parseInt(userData.section),
          gender: userData.gender,
          password: userData.password,
        },
      },
    })

    if (registerRes.data.addUser.registered === false) {
      notify('Current User is not an Admin')
      return
    }

    notify('User Successfully Registered')
    handleReset()
  }

  if (sectionsLoading) return <LoadingSpinner />
  if (sectionsError) return <ErrorText>Something went wrong</ErrorText>

  return (
    <div className="register">
      <form
        method="POST"
        onSubmit={handleSubmit}
        className="register__form control-panel__card"
      >
        <p className="register__heading fw-bold">Register User</p>

        <div className="register__input-control">
          <label htmlFor="firstName">First Name: </label>
          <input
            onChange={handleChange}
            value={userData.firstName}
            type="text"
            id="firstName"
            name="firstName"
            required
          />
        </div>

        <div className="register__input-control">
          <label htmlFor="lastName">Last Name: </label>
          <input
            onChange={handleChange}
            value={userData.lastName}
            type="text"
            id="lastName"
            name="lastName"
            required
          />
        </div>

        <div className="register__input-control">
          <label htmlFor="username">Username: </label>
          <input
            onChange={handleChange}
            value={userData.username}
            type="text"
            id="username"
            name="username"
            required
          />
        </div>

        <div className="register__input-control">
          <label htmlFor="password">Password: </label>
          <input
            onChange={handleChange}
            value={userData.password}
            type="password"
            id="password"
            name="password"
            required
          />
        </div>

        <div className="register__input-control">
          <label htmlFor="birthdate">Birthdate: </label>
          <input
            onChange={handleChange}
            value={userData.birthdate}
            type="date"
            id="birthdate"
            name="birthdate"
            required
          />
        </div>

        <div className="register__input-control">
          <label htmlFor="gender">Gender: </label>
          <select
            onChange={handleChange}
            value={userData.gender}
            name="gender"
            id="gender"
            required
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div className="register__input-control">
          <label htmlFor="section">Section: </label>
          <select
            onChange={handleChange}
            value={userData.section}
            type="text"
            id="section"
            name="section"
            required
          >
            {sections.sections.map((section) => {
              if (section.disabled) return
              return (
                <option key={section.id} value={section.id}>
                  {section.section_name}
                </option>
              )
            })}
          </select>
        </div>

        <div className="register__input-control">
          <label htmlFor="address">Address: </label>
          <input
            onChange={handleChange}
            value={userData.address}
            type="text"
            id="address"
            name="address"
            required
          />
        </div>

        <div className="register__input-control">
          <label htmlFor="accessLevel">Access Level: </label>
          <select
            onChange={handleChange}
            value={userData.accessLevel}
            name="accessLevel"
            id="accessLevel"
            required
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>

        <div className="register__button-group">
          <Button>Submit</Button>
          <Button secondary type="reset" onClick={handleReset}>
            Clear
          </Button>
        </div>
      </form>
    </div>
  )
}
