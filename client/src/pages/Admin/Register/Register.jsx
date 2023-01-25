import { useState } from 'react'
import Button from '../../../components/UI/Button/Button'
import './register.scss'
import { useAddUserMutation } from '../../../graphql/hooks/graphql'

export default function Register() {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    age: '',
    gender: 'Male',
    section: '',
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
      age: '',
      gender: 'Male',
      section: '',
      address: '',
      accessLevel: 'USER',
      password: '',
    })
  }

  const handleSubmit = async (e) => {
    // Check if there are falsy values (e.g. '' or null)
    if (Object.values(userData).some((el) => el == false)) return

    e.preventDefault()

    console.log(userData)

    const registerRes = await register({
      variables: {
        userData: {
          access_level: userData.accessLevel,
          username: userData.username,
          first_name: userData.firstName,
          last_name: userData.lastName,
          age: parseInt(userData.age),
          address: userData.address,
          section: userData.section,
          gender: userData.gender,
          password: userData.password,
        },
      },
    })

    if (registerRes.data.addUser.registered === false) {
      alert('Current User is not an Admin')
    }

    alert('User Sucessfully Registered')
    handleReset()
  }

  return (
    <div className="register">
      <form
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
          <label htmlFor="age">Age: </label>
          <input
            onChange={handleChange}
            value={userData.age}
            type="number"
            id="age"
            name="age"
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
          <input
            onChange={handleChange}
            value={userData.section}
            type="text"
            id="section"
            name="section"
            required
          />
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
