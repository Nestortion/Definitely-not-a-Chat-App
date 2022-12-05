import Avatar from '../../components/UI/Avatar/Avatar'
import { apiBasePath } from '../../data/config'
import './profile.scss'

export default function Profile() {
  const currentProfile = {
    firstName: 'John',
    lastName: 'Doe',
    age: 21,
    gender: 'Male',
    section: 'BSIT 4-1',
    username: 'johndoe',
    profilePicUrl: `${apiBasePath}/message/images/amogusz.jpg`,
  }

  return (
    <div className="profile">
      <div className="profile__header">
        <div className="profile__image">
          <Avatar src={currentProfile.profilePicUrl} size={256} />
        </div>
        <h1 className="text-primary-400">
          {currentProfile.firstName} {currentProfile.lastName}
        </h1>
        <span>{currentProfile.username}</span>
      </div>
      <div className="profile__info">
        <span>Age: {currentProfile.age}</span>
        <span>Gender: {currentProfile.gender}</span>
        <span>Section: {currentProfile.section}</span>
      </div>
    </div>
  )
}
