import { useState } from 'react'
import ErrorText from '../../../components/Error/ErrorText'
import GroupList from '../../../components/GroupList/GroupList'
import LoadingSpinner from '../../../components/Loading/LoadingSpinner/LoadingSpinner'
import { useGroupListQuery } from '../../../graphql/hooks/graphql'
import './admin-groups-list.scss'

export default function AdminGroupsList() {
  const [searchInput, setSearchInput] = useState('')

  const {
    data: groupChats,
    error: groupChatsError,
    loading: groupChatsLoading,
  } = useGroupListQuery()

  if (groupChatsLoading) return <LoadingSpinner />
  if (groupChatsError) return <ErrorText>Something Went Wrong</ErrorText>

  const handleChange = (e) => {
    setSearchInput(e.target.value)
  }

  return (
    <div className="admin-groups-list">
      <div className="admin-groups-list__component control-panel__card">
        <div className="admin-groups-list__top">
          <p className="admin-groups-list__list-heading fw-bold">Chat List</p>
          <input
            type="text"
            className="admin-groups-list__list-search"
            placeholder="Search user"
            onChange={handleChange}
            value={searchInput}
          />
        </div>

        <div className="admin-groups-list__main">
          {groupChats.groupList.map((groupChat) => (
            <GroupList
              key={groupChat.id}
              id={groupChat.id}
              isGroup={groupChat.is_group}
              groupName={groupChat.group_name}
              profilePicUrl={groupChat.group_picture}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
