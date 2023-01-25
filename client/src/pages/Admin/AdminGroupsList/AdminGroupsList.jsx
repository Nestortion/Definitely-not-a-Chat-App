import { useEffect, useState } from 'react'
import ErrorText from '../../../components/Error/ErrorText'
import GroupList from '../../../components/GroupList/GroupList'
import LoadingSpinner from '../../../components/Loading/LoadingSpinner/LoadingSpinner'
import { useGroupListQuery } from '../../../graphql/hooks/graphql'
import useDebounceValue from '../../../helper_hooks/useDebounceValue'
import './admin-groups-list.scss'

export default function AdminGroupsList() {
  const [searchInput, setSearchInput] = useState('')
  const [searchData, setSearchData] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const debounceValue = useDebounceValue(searchInput, 250)

  const {
    data: chats,
    error: chatsLoading,
    loading: chatsError,
  } = useGroupListQuery()

  useEffect(() => {
    ;(() => {
      if (searchInput && searchInput.length > 0) {
        const filteredData = chats.groupList.filter((group) => {
          return group.group_name.toLowerCase().includes(debounceValue)
        })

        setSearchData(filteredData)
        setIsSearching(true)
      } else {
        setIsSearching(false)
      }
    })()
  }, [debounceValue])

  if (chatsLoading) return <LoadingSpinner />
  if (chatsError) return <ErrorText>Something Went Wrong</ErrorText>

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
          {isSearching
            ? searchData.map((groupChat) => (
                <div key={groupChat.id}>
                  <GroupList
                    key={groupChat.id.toString()}
                    id={groupChat.id}
                    isGroup={groupChat.is_group}
                    groupName={groupChat.group_name}
                    profilePicUrl={groupChat.group_picture}
                  />
                  <hr />
                </div>
              ))
            : chats.groupList.map((groupChat) => (
                <div key={groupChat.id}>
                  <GroupList
                    id={groupChat.id}
                    isGroup={groupChat.is_group}
                    groupName={groupChat.group_name}
                    profilePicUrl={groupChat.group_picture}
                  />
                  <hr />
                </div>
              ))}
        </div>
      </div>
    </div>
  )
}
