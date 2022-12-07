import './leftbar.scss'
import Button from '../UI/Button/Button'
import Input from '../UI/Input/Input'
import ChatList from '../ChatList/ChatList'
import { useState } from 'react'
import {
  useGroupsQuery,
  useLatestChatsQuery,
  useSearchGroupsLazyQuery,
} from '../../graphql/hooks/graphql'
import ErrorText from '../Error/ErrorText'
import LoadingSpinner from '../Loading/LoadingSpinner/LoadingSpinner'
import { MdAdd } from 'react-icons/md'

export default function LeftBar({ showOnlyMiddle }) {
  const { data: chat, loading, error } = useGroupsQuery()
  const [searchData, setSearchData] = useState()
  const [searchGroups] = useSearchGroupsLazyQuery()
  const [isSearching, setIsSearching] = useState(false)
  const {
    data: latestChats,
    loading: latestLoading,
    error: latestError,
  } = useLatestChatsQuery()

  if (latestLoading) return <LoadingSpinner />
  if (latestError) return <ErrorText>Something went wrong</ErrorText>
  if (loading) return <LoadingSpinner />
  if (error) return <ErrorText>Something went wrong</ErrorText>

  const searchValueHandle = async (e) => {
    if (e.target.value) {
      const searchRes = await searchGroups({
        variables: { groupName: e.target.value },
      })
      setSearchData(searchRes.data)
      setIsSearching(true)
    } else {
      setIsSearching(false)
    }
  }

  return (
    <div className="leftbar">
      <div className="top">
        <div className="header">
          <h1>Chats</h1>
          <Button>
            <MdAdd />
          </Button>
        </div>
        <div className="search">
          <form>
            <Input
              onChange={searchValueHandle}
              type="text"
              placeholder="Search Chats"
            />
          </form>
        </div>
      </div>

      <div className="bottom">
        <ChatList
          chats={isSearching ? searchData.searchGroups : chat.groups}
          latest={latestChats.latestChats}
          showOnlyMiddle={showOnlyMiddle}
        />
      </div>
    </div>
  )
}
