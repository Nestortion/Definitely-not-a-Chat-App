import { useMediaQuery } from 'react-responsive'
import { useNavigate, useParams } from 'react-router-dom'
import { apiBasePath } from '../../../data/config'
import Avatar from '../../UI/Avatar/Avatar'
import './role-member.scss'
import { MdClose } from 'react-icons/md'
import { useRemoveMemberMutation } from '../../../graphql/hooks/graphql'

export default function RoleMember({ id, name, pfp, showOnlyMiddle }) {
  const { chatId } = useParams()
  const navigate = useNavigate()
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 961px)' })
  const [removeMember] = useRemoveMemberMutation()

  const navigateToProfile = () => {
    if (isTabletOrMobile) {
      showOnlyMiddle()
    }
    navigate(`/profile/${id}`)
  }

  const handleEditRole = () => {
    console.log(id)
  }
  const handleRemoveMember = () => {
    removeMember({ variables: { userId: id, groupId: parseInt(chatId) } })
  }

  return (
    <div className="role-member">
      <div className="role-member__info">
        <Avatar
          size={20}
          src={`${apiBasePath}/pfp/${pfp}`}
          onClick={navigateToProfile}
        />
        <span className="fs-400">{name}</span>
      </div>
      <button
        className="fs-300 bg-secondary-400 text-neutral-100 role-member__button"
        onClick={handleEditRole}
      >
        Edit Role
      </button>
      <button
        className="fs-300 bg-error-400 text-neutral-100 role-member__button"
        onClick={handleRemoveMember}
      >
        <MdClose />
      </button>
    </div>
  )
}
