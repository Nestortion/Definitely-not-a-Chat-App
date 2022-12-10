import './leftbar.scss'
import Button from '../UI/Button/Button'
import Input from '../UI/Input/Input'
import ChatList from '../ChatList/ChatList'
import { useState } from 'react'
import {
  ChatAddedDocument,
  useCurrentUserQuery,
  useGroupsQuery,
  useLatestChatsQuery,
  useSearchGroupsLazyQuery,
} from '../../graphql/hooks/graphql'
import ErrorText from '../Error/ErrorText'
import LoadingSpinner from '../Loading/LoadingSpinner/LoadingSpinner'
import { MdAdd } from 'react-icons/md'
import { useEffect } from 'react'

export default function LeftBar({ showOnlyMiddle }) {
  const [searchData, setSearchData] = useState()
  const [isSearching, setIsSearching] = useState(false)
  const {
    data: chat,
    loading,
    error,
    refetch: refetchGroups,
  } = useGroupsQuery()
  const [searchGroups] = useSearchGroupsLazyQuery()

  const {
    data: latestChats,
    loading: latestLoading,
    error: latestError,
    subscribeToMore,
    refetch: refetchLatestChat,
  } = useLatestChatsQuery()
  const {
    data: user,
    loading: userLoading,
    error: userError,
  } = useCurrentUserQuery()

  useEffect(() => {
    subscribeToMore({
      document: ChatAddedDocument,
      variables: { user: user?.currentUser.id },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev

        const updatedChats = prev.latestChats.map((chat) => {
          if (chat?.receiver === subscriptionData.data.chatAdded.receiver) {
            return subscriptionData.data.chatAdded
          }
          return chat
        })
        refetchLatestChat()
        refetchGroups()

        return {
          latestChats: [...updatedChats],
        }
      },
    })
  }, [])

  if (userLoading) return <LoadingSpinner />
  if (userError) return <ErrorText>Something went wrong</ErrorText>
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
