import { useParams } from 'react-router-dom'
import ErrorText from '../../components/Error/ErrorText'
import LoadingSpinner from '../../components/Loading/LoadingSpinner/LoadingSpinner'
import Avatar from '../../components/UI/Avatar/Avatar'
import Button from '../../components/UI/Button/Button'
import { apiBasePath } from '../../data/config'
import {
  useCurrentUserQuery,
  useUserProfileQuery,
} from '../../graphql/hooks/graphql'
import './profile.scss'
import { MdWarning } from 'react-icons/md'

export default function Profile() {
  const {
    data: currentUser,
    loading: currentUserLoading,
    error: currentUserError,
  } = useCurrentUserQuery()
  const { profileId } = useParams()
  const {
    data: profileData,
    loading: profileLoading,
    error: profileError,
  } = useUserProfileQuery({ variables: { userProfileId: parseInt(profileId) } })

  if (currentUserLoading) return <LoadingSpinner />
  if (currentUserError) return <ErrorText />
  if (profileLoading) return <LoadingSpinner />
  if (profileError) return <ErrorText />

  if (!profileData.userProfile) {
    return (
      <div className="profile-not-found__container">
        <span className="profile-not-found fw-bold">Profile not found</span>
      </div>
    )
  }

  return (
    <div className="profile">
      <div className="profile__header">
        <div className="profile__image">
          <Avatar
            src={`${apiBasePath}/pfp/${profileData.userProfile.profile_img}`}
            size={256}
          />
        </div>
        <h1 className="text-primary-400">
          {profileData.userProfile.first_name}{' '}
          {profileData.userProfile.last_name}
        </h1>
      </div>
      <div className="profile__info">
        <span>Age: {profileData.userProfile.age}</span>
        <span>Gender: {profileData.userProfile.gender}</span>
        <span>Section: {profileData.userProfile.section}</span>
        <span>Address: {profileData.userProfile.address}</span>
      </div>
      {currentUser.currentUser.access_level === 'ADMIN' &&
        currentUser.currentUser.id !== +profileId && (
          <div className="profile__button-group">
            <Button secondary>
              <MdWarning /> Disable User
            </Button>
          </div>
        )}
    </div>
  )
}
