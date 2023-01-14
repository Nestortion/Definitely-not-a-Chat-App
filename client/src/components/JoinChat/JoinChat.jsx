import { useState } from 'react'
import Button from '../UI/Button/Button'
import ReactSearchBox from 'react-search-box'
import './join-chat.scss'
import {
  useAddMemberListQuery,
  useCreateGroupMutation,
} from '../../graphql/hooks/graphql'
import { useNavigate, useParams } from 'react-router-dom'
import LoadingSpinner from '../Loading/LoadingSpinner/LoadingSpinner'
import ErrorText from '../Error/ErrorText'
import { toast } from 'react-toastify'

export default function JoinChat({ closeModal }) {
  const notify = () =>
    toast('Group Created!', {
      position: toast.POSITION.TOP_CENTER,
      style: {
        color: 'var(--clr-neutral-100)',
        backgroundColor: 'var(--clr-primary-400)',
        fontSize: 'clamp(0.8rem, 1.3vw, 1.5rem)',
      },
    })

  const { chatId } = useParams()
  const [joinChatId, setJoinChatId] = useState('')
  const [selectedMembers, setSelectedMembers] = useState([])
  const {
    data: users,
    loading,
    error,
  } = useAddMemberListQuery({
    variables: { groupId: parseInt(chatId), form: 'userList' },
  })
  const [createGroup] = useCreateGroupMutation()
  const navigate = useNavigate()

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorText>Error</ErrorText>

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const handleJoinChatIdChange = (e) => {
    setJoinChatId(e.target.value)
  }

  const handleJoin = () => {
    if (!joinChatId) return
    console.log(joinChatId)
  }

  const handleAddMember = (member) => {
    if (selectedMembers.includes(member)) return
    setSelectedMembers([...selectedMembers, member])
  }

  const handleRemoveMember = (memberToBeRemoved) => {
    console.log(memberToBeRemoved)
    setSelectedMembers(
      selectedMembers.filter((member) => member.key !== memberToBeRemoved.key)
    )
  }

  const handleCreate = async () => {
    // Create chat with selected members
    if (selectedMembers.length === 0) return
    const selectedIds = selectedMembers.map((member) => member.key)
    const group = await createGroup({ variables: { userId: selectedIds } })
    navigate(`chat/${group.data.createGroup.id}`)
    closeModal()
    notify()
  }

  return (
    <div className="join-chat">
      <form onSubmit={handleSubmit}>
        <div className="join-chat__form__control">
          <span>Create a Conversation</span>
          <ReactSearchBox
            placeholder="Search member"
            data={users.addMemberList}
            onSelect={(member) => handleAddMember(member.item)}
            clearOnSelect
            inputFontSize="0.8rem"
          />
          <div className="join-chat__selected-members">
            {selectedMembers.length > 0 && <h5>Selected Members: </h5>}
            <ul>
              {selectedMembers.map((member) => (
                <li key={member.key}>
                  <div className="join-chat__selected-member">
                    <span>{member.value}</span>
                    <input
                      type="checkbox"
                      defaultChecked
                      onClick={() => handleRemoveMember(member)}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <Button onClick={handleCreate}>Create</Button>
        </div>
      </form>
    </div>
  )
}
