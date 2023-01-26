import { useEffect, useState } from 'react'
import ErrorText from '../../../components/Error/ErrorText'
import GroupList from '../../../components/GroupList/GroupList'
import LoadingSpinner from '../../../components/Loading/LoadingSpinner/LoadingSpinner'
import { useGroupListQuery } from '../../../graphql/hooks/graphql'
import useDebounceValue from '../../../helper_hooks/useDebounceValue'
import './admin-groups-list.scss'

export default function AdminGroupsList() {
  const [searchInput, setSearchInput] = useState('')
  const [searchDataPrivate, setSearchDataPrivate] = useState([])
  const [searchDataGroup, setSearchDataGroup] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const debounceValue = useDebounceValue(searchInput.toLowerCase(), 250)

  const {
    data: chats,
    error: chatsLoading,
    loading: chatsError,
  } = useGroupListQuery()

  const groupChats = chats?.groupList.filter((groupChat) => {
    return groupChat.is_group === 'true'
  })

  const privateChats = chats?.groupList.filter((groupChat) => {
    return groupChat.is_group === 'false'
  })

  useEffect(() => {
    ;(() => {
      if (searchInput && searchInput.length > 0) {
        const filteredData = privateChats.filter((group) => {
          return group.group_name.toLowerCase().includes(debounceValue)
        })

        setSearchDataPrivate(filteredData)
        setIsSearching(true)
      } else {
        setIsSearching(false)
      }
    })()
  }, [debounceValue])

  useEffect(() => {
    ;(() => {
      if (searchInput && searchInput.length > 0) {
        const filteredData = groupChats.filter((group) => {
          return group.group_name.toLowerCase().includes(debounceValue)
        })

        setSearchDataGroup(filteredData)
        setIsSearching(true)
      } else {
        setIsSearching(false)
      }
    })()
  }, [debounceValue])

  if (chatsLoading) return
  if (chatsError) return

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

        <div className="admin-groups-list__main-container">
          <div className="admin-groups-list__main">
            <p className="fw-bold fs-500">Private Chats</p>
            {isSearching
              ? searchDataPrivate.map((groupChat) => (
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
              : privateChats.map((groupChat) => (
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

          <div className="admin-groups-list__main">
            <p className="fw-bold fs-500">Group Chats</p>
            {isSearching
              ? searchDataGroup.map((groupChat) => (
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
              : groupChats.map((groupChat) => (
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
    </div>
  )
}
