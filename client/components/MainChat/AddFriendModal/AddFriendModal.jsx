import { AddFriendModalStyled } from '../../styles/MainChatStyled'
import UserCard from './UserCard'

export default function AddFriendModal() {
  return (
    <AddFriendModalStyled>
      <div className="search">
        <input type="text" placeholder="🔍 Search" />
      </div>
      <div className="userList">
        <div className="availableUser">
          <span className="header">Available Users</span>

          <UserCard />
          <UserCard />
          <UserCard />
        </div>
        <div className="selectedUser">
          <span className="header">Selected Users</span>
          <UserCard />
          <UserCard />
          <UserCard />
        </div>
      </div>
      <button>Add members</button>
    </AddFriendModalStyled>
  )
}
